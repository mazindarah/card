"use client";

import { useState } from "react";

type CardPreviewProps = {
  imageUrl: string | null;
  fullName: string;
  onReset: () => void;
};

export function CardPreview({ imageUrl, fullName, onReset }: CardPreviewProps) {
  if (!imageUrl) return null;

  const safeName = fullName.trim() || "بطاقة";
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const normalizedName = safeName.replace(/\s+/g, "-");

  const getShareMeta = () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareText = `بطاقة معايدة جميلة من دارة الملك عبدالعزيز باسم ${safeName}`;
    return { shareUrl, shareText };
  };

  const handleNativeShare = async () => {
    if (typeof navigator === "undefined" || !navigator.share) {
      setShareMessage("المشاركة المباشرة غير مدعومة في هذا المتصفح.");
      return;
    }

    const { shareUrl, shareText } = getShareMeta();

    try {
      const imageBlob = await fetch(imageUrl).then((res) => res.blob());
      const imageFile = new File([imageBlob], `darah-card-${normalizedName}.png`, {
        type: "image/png",
      });

      const payload: ShareData = {
        title: "بطاقة معايدة",
        text: shareText,
        url: shareUrl,
      };

      if (navigator.canShare?.({ files: [imageFile] })) {
        payload.files = [imageFile];
      }

      await navigator.share(payload);
      setShareMessage("تم فتح خيارات المشاركة بنجاح.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareMessage("تعذر تنفيذ المشاركة المباشرة حالياً.");
    }
  };

  return (
    <section className="mt-7 flex flex-col items-center">

      {/* مؤشر الخطوة الثانية */}
      <div className="mb-5 flex items-center gap-2 text-sm text-[#8a7a52]">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#b79d56] text-[.7rem] font-bold text-white shadow-sm">
          ٢
        </span>
        <span className="font-semibold">البطاقة جاهزة للتنزيل</span>
      </div>

      {/* إطار البطاقة الاحترافي */}
      <div className="relative w-full max-w-75">
        {/* هالة خارجية */}
        <div className="absolute -inset-0.75 rounded-[20px] bg-linear-to-b from-[#d4b86a] via-[#b79d56]/60 to-[#8c7438] opacity-70" />
        {/* الصورة */}
        <div className="relative overflow-hidden rounded-[18px] shadow-[0_24px_56px_-12px_rgba(80,60,15,.55)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={`معاينة بطاقة ${safeName}`}
            className="block h-auto w-full"
            loading="lazy"
          />
        </div>
      </div>

      {/* أزرار الإجراءات */}
      <div className="mt-6 flex w-full max-w-75 flex-col gap-3">
        <a
          href={imageUrl}
          download={`darah-card-${normalizedName}.png`}
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-linear-to-b from-[#c5aa62] to-[#9e8440] text-sm font-bold text-white shadow-[0_6px_22px_-8px_rgba(80,60,10,.55)] transition hover:brightness-110 active:scale-[.98]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          تنزيل البطاقة
        </a>

        <button
          type="button"
          onClick={handleNativeShare}
          className="flex h-11 items-center justify-center gap-2 rounded-full border border-[#bda35b]/65 bg-white/80 text-sm font-semibold text-[#7a6a2e] transition hover:bg-[#faf3e0] active:scale-[.98]"
        >
          مشاركة مباشرة
        </button>

        {shareMessage ? (
          <p className="text-center text-xs text-[#7a6a2e]">{shareMessage}</p>
        ) : null}

        <button
          type="button"
          onClick={onReset}
          className="flex h-11 items-center justify-center gap-2 rounded-full border border-[#c5b074]/55 text-sm font-semibold text-[#7a6a2e] transition hover:border-[#b79d56] hover:bg-[#faf3e0] active:scale-[.98]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          إنشاء بطاقة جديدة
        </button>
      </div>
    </section>
  );
}
