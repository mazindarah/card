import { NextResponse } from "next/server";
import { generateCardImage } from "@/lib/image-generator";
import { sanitizeName } from "@/lib/sanitize-name";
import { validateName } from "@/lib/validate-name";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RequestPayload = {
    fullName?: string;
};

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as RequestPayload;
        const rawName = body.fullName ?? "";

        const cleanName = sanitizeName(rawName);
        const validation = validateName(cleanName);

        if (!validation.success) {
            return NextResponse.json({ error: validation.message }, { status: 400 });
        }

        const imageBuffer = await generateCardImage(validation.normalizedName);

        return new NextResponse(new Uint8Array(imageBuffer), {
            status: 200,
            headers: {
                "Content-Type": "image/png",
                "Content-Disposition": `inline; filename=card-${Date.now()}.png`,
                "Cache-Control": "no-store",
            },
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "تعذر إنشاء البطاقة. حاول مرة أخرى.";

        return NextResponse.json({ error: message }, { status: 500 });
    }
}
