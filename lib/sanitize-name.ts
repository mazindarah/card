const ZERO_WIDTH_CHARS = /[\u200B-\u200F\uFEFF]/g;
const TATWEEL = /\u0640/g;

export function sanitizeName(input: string): string {
    return input
        .normalize("NFKC")
        .replace(ZERO_WIDTH_CHARS, "")
        .replace(TATWEEL, "")
        .replace(/\s+/g, " ")
        .trim();
}
