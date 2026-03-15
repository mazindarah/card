type ComputeFontSizeInput = {
    text: string;
    boxWidth: number;
    boxHeight: number;
    fontSize: number;
    minFontSize: number;
    lineHeight: number;
    fitScale?: number;
    maxLines?: number;
};

type ComputeFontSizeResult = {
    fontSize: number;
    fits: boolean;
};

function estimateGlyphFactor(char: string): number {
    if (/\s/.test(char)) {
        return 0.22;
    }

    if (/[\u0600-\u06FF]/.test(char)) {
        return 0.46;
    }

    if (/[MW@#%&]/.test(char)) {
        return 0.78;
    }

    if (/[A-Z]/.test(char)) {
        return 0.58;
    }

    if (/[a-z0-9]/.test(char)) {
        return 0.5;
    }

    return 0.5;
}

export function estimateTextWidth(text: string, fontSize: number): number {
    let units = 0;
    for (const char of text) {
        units += estimateGlyphFactor(char);
    }

    return units * fontSize;
}

export function computeBestFontSize({
    text,
    boxWidth,
    boxHeight,
    fontSize,
    minFontSize,
    lineHeight,
    fitScale = 0.97,
    maxLines = 1,
}: ComputeFontSizeInput): ComputeFontSizeResult {
    const allowedWidth = Math.max(1, boxWidth * fitScale);
    const allowedHeight = Math.max(1, boxHeight * 0.92);

    for (let size = fontSize; size >= minFontSize; size -= 1) {
        const estimatedWidth = estimateTextWidth(text, size);
        const estimatedHeight = size * lineHeight * maxLines;

        if (estimatedWidth <= allowedWidth && estimatedHeight <= allowedHeight) {
            return { fontSize: size, fits: true };
        }
    }

    return { fontSize: minFontSize, fits: false };
}
