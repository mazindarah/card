export type TextAlign = "center" | "right" | "left";

export type TextBoxConfig = {
    x: number;
    y: number;
    width: number;
    height: number;
    paddingX?: number;
    paddingY?: number;
    offsetX?: number;
    offsetY?: number;
    fitScale?: number;
    debugBox?: boolean;
    fontFamily: string;
    fontSize: number;
    minFontSize: number;
    lineHeight: number;
    textColor: string;
    textAlign: TextAlign;
};

export type CardTemplateConfig = {
    key: "eid" | "ramadan" | "national-day" | "founding-day";
    templatePath: string;
    fontPath: string;
    width: number;
    height: number;
    textBox: TextBoxConfig;
};

export const cardTemplates: Record<CardTemplateConfig["key"], CardTemplateConfig> = {
    eid: {
        key: "eid",
        templatePath: "public/templates/eid-card.png",
        fontPath: "public/fonts/Cairo.ttf",
        width: 1080,
        height: 1920,
        textBox: {
            x: 530,
            y: 1632,
            width: 520,
            height: 74,
            paddingX: 20,
            paddingY: 6,
            offsetX: 40,
            offsetY: -53,
            fitScale: 0.97,
            debugBox: false,
            fontFamily: "Cairo",
            fontSize: 62,
            minFontSize: 32,
            lineHeight: 1,
            textColor: "#FFFFFF",
            textAlign: "center",
        },
    },
    ramadan: {
        key: "ramadan",
        templatePath: "public/templates/eid-card.png",
        fontPath: "public/fonts/Cairo.ttf",
        width: 1080,
        height: 1920,
        textBox: {
            x: 380,
            y: 1632,
            width: 520,
            height: 74,
            paddingX: 20,
            paddingY: 6,
            offsetX: 40,
            offsetY: -53,
            fitScale: 0.97,
            debugBox: false,
            fontFamily: "Cairo",
            fontSize: 62,
            minFontSize: 32,
            lineHeight: 1,
            textColor: "#FFFFFF",
            textAlign: "center",
        },
    },
    "national-day": {
        key: "national-day",
        templatePath: "public/templates/eid-card.png",
        fontPath: "public/fonts/Cairo.ttf",
        width: 1080,
        height: 1920,
        textBox: {
            x: 380,
            y: 1632,
            width: 520,
            height: 74,
            paddingX: 20,
            paddingY: 6,
            offsetX: 40,
            offsetY: -53,
            fitScale: 0.97,
            debugBox: false,
            fontFamily: "Cairo",
            fontSize: 62,
            minFontSize: 32,
            lineHeight: 1,
            textColor: "#FFFFFF",
            textAlign: "center",
        },
    },
    "founding-day": {
        key: "founding-day",
        templatePath: "public/templates/eid-card.png",
        fontPath: "public/fonts/Cairo.ttf",
        width: 1080,
        height: 1920,
        textBox: {
            x: 380,
            y: 1632,
            width: 520,
            height: 74,
            paddingX: 20,
            paddingY: 6,
            offsetX: 40,
            offsetY: -53,
            fitScale: 0.97,
            debugBox: false,
            fontFamily: "Cairo",
            fontSize: 62,
            minFontSize: 32,
            lineHeight: 1,
            textColor: "#FFFFFF",
            textAlign: "center",
        },
    },
};

export const activeTemplate = cardTemplates.eid;
