import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { activeTemplate } from "@/config/card-template";
import { computeBestFontSize } from "@/lib/text-layout";

function escapeXml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

async function loadTemplateBuffer(absolutePath: string): Promise<Buffer> {
    try {
        return await fs.readFile(absolutePath);
    } catch {
        const fallback = sharp({
            create: {
                width: activeTemplate.width,
                height: activeTemplate.height,
                channels: 4,
                background: "#1E1A16",
            },
        });

        return fallback.png().toBuffer();
    }
}

export async function generateCardImage(fullName: string): Promise<Buffer> {
    const projectRoot = process.cwd();
    const templatePath = path.join(projectRoot, activeTemplate.templatePath);
    const fontPath = path.join(projectRoot, activeTemplate.fontPath);

    const [templateBuffer, fontBuffer] = await Promise.all([
        loadTemplateBuffer(templatePath),
        fs.readFile(fontPath),
    ]);

    const { width, height, textBox } = activeTemplate;

    const paddingX = textBox.paddingX ?? 0;
    const paddingY = textBox.paddingY ?? 0;
    const offsetX = textBox.offsetX ?? 0;
    const offsetY = textBox.offsetY ?? 0;

    const innerX = textBox.x + paddingX;
    const innerY = textBox.y + paddingY;
    const innerWidth = Math.max(1, textBox.width - paddingX * 2);
    const innerHeight = Math.max(1, textBox.height - paddingY * 2);

    // حساب حجم خط مناسب لضمان بقاء الاسم داخل الصندوق المحدد دون تجاوز.
    const { fontSize, fits } = computeBestFontSize({
        text: fullName,
        boxWidth: innerWidth,
        boxHeight: innerHeight,
        fontSize: textBox.fontSize,
        minFontSize: textBox.minFontSize,
        lineHeight: textBox.lineHeight,
        fitScale: textBox.fitScale,
    });

    if (!fits) {
        throw new Error("الاسم أطول من المساحة المخصصة على البطاقة.");
    }

    const fontBase64 = fontBuffer.toString("base64");
    const centeredNameSvg = `
        <svg width="${Math.round(innerWidth)}" height="${Math.round(innerHeight)}" viewBox="0 0 ${Math.round(innerWidth)} ${Math.round(innerHeight)}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    @font-face {
                        font-family: "CardNameFont";
                        src: url("data:font/ttf;base64,${fontBase64}") format("truetype-variations"),
                             url("data:font/ttf;base64,${fontBase64}") format("truetype");
                    }

                    text {
                        font-family: "CardNameFont", "Cairo", sans-serif;
                        font-size: ${fontSize}px;
                        font-weight: 700;
                        fill: ${textBox.textColor};
                        text-anchor: middle;
                        dominant-baseline: middle;
                        direction: rtl;
                        unicode-bidi: plaintext;
                    }
                </style>
            </defs>
            <text x="50%" y="50%">${escapeXml(fullName)}</text>
        </svg>
    `;

    const textLayer = {
        input: Buffer.from(centeredNameSvg),
        left: Math.round(innerX + offsetX),
        top: Math.round(innerY + offsetY),
    };

    const compositeLayers: Array<{
        input: Buffer | { text: { text: string; rgba: boolean; width: number; height: number; align: "left" | "center" | "right"; font: string; fontfile: string } };
        left?: number;
        top?: number;
    }> = [textLayer];

    if (textBox.debugBox) {
        const debugSvg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"><rect x="${textBox.x}" y="${textBox.y}" width="${textBox.width}" height="${textBox.height}" fill="none" stroke="#8CFF48" stroke-width="2" /></svg>`;
        compositeLayers.push({ input: Buffer.from(debugSvg) });
    }

    return sharp(templateBuffer)
        .resize(width, height, { fit: "fill" })
        .composite(compositeLayers)
        .png({ quality: 100 })
        .toBuffer();
}
