type ValidationResult =
    | { success: true; normalizedName: string }
    | { success: false; message: string };

const MAX_NAME_LENGTH = 40;
const MIN_TOKEN_LENGTH = 2;

const ALLOWED_CHARS = /^[\p{Script=Arabic}\p{Script=Latin}\p{M}\s.'-]+$/u;
const HAS_LETTER = /[\p{Script=Arabic}\p{Script=Latin}]/u;
const REPEATED_PUNCTUATION = /([.'-])\1+/;
const REPEATED_CHARACTER_SEQUENCE = /(.)\1{4,}/u;
const MULTIPLE_DOTS = /\.{2,}/;

const blockedWords = [
    "سب",
    "شتيمة",
    "لعن",
    "قذر",
    "حقير",
    "idiot",
    "stupid",
    "fuck",
    "bitch",
    "asshole",
];

export function validateName(name: string): ValidationResult {
    if (!name || name.trim().length === 0) {
        return { success: false, message: "الاسم الكامل مطلوب." };
    }

    if (name.length > MAX_NAME_LENGTH) {
        return {
            success: false,
            message: `الاسم طويل جدا. الحد الأقصى ${MAX_NAME_LENGTH} حرفا.`,
        };
    }

    if (!ALLOWED_CHARS.test(name)) {
        return {
            success: false,
            message:
                "الاسم يحتوي على رموز غير مسموحة. استخدم الحروف العربية أو الإنجليزية فقط.",
        };
    }

    if (!HAS_LETTER.test(name)) {
        return {
            success: false,
            message: "الاسم غير صالح. الرجاء إدخال اسم حقيقي.",
        };
    }

    if (REPEATED_PUNCTUATION.test(name) || MULTIPLE_DOTS.test(name)) {
        return {
            success: false,
            message: "الاسم يحتوي على علامات ترقيم متكررة بشكل غير صالح.",
        };
    }

    if (REPEATED_CHARACTER_SEQUENCE.test(name)) {
        return {
            success: false,
            message: "الاسم يحتوي على تكرار مبالغ فيه لأحرف غير صالح.",
        };
    }

    const lowered = name.toLowerCase();
    if (blockedWords.some((word) => lowered.includes(word))) {
        return {
            success: false,
            message: "تعذر قبول الاسم المدخل. الرجاء إدخال اسم مناسب.",
        };
    }

    const tokens = name.split(" ").filter(Boolean);

    if (tokens.length < 2) {
        return {
            success: false,
            message: "يرجى إدخال الاسم الكامل (اسمين على الأقل).",
        };
    }

    if (tokens.some((token) => token.length < MIN_TOKEN_LENGTH)) {
        return {
            success: false,
            message: "الاسم غير صالح. تأكد من إدخال اسم واضح وكامل.",
        };
    }

    if (tokens.some((token) => /^([.'-]|.*[.'-]$)/.test(token))) {
        return {
            success: false,
            message: "تنسيق الاسم غير صالح بسبب مواقع علامات الترقيم.",
        };
    }

    return { success: true, normalizedName: name };
}
