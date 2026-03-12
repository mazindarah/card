"use client";

import { useCallback, useMemo, useState } from "react";
import { CardPreview } from "@/components/CardPreview";

type ApiError = { error?: string };

export function NameForm() {
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const hasPreview = previewUrl !== null;

  const disableSubmit = useMemo(
    () => isLoading || fullName.trim().length === 0,
    [isLoading, fullName],
  );

  const handleReset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFullName("");
    setError(null);
  }, [previewUrl]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }

      setIsLoading(true);

      try {
        const response = await fetch("/api/generate-card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName }),
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as ApiError | null;
          throw new Error(data?.error || "تعذر إنشاء البطاقة. حاول مرة أخرى.");
        }

        const imageBlob = await response.blob();
        setPreviewUrl(URL.createObjectURL(imageBlob));
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "حدث خطأ غير متوقع أثناء إنشاء البطاقة.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [fullName, previewUrl],
  );

  return (
    <div className="mx-auto w-full max-w-md">

      {/* مؤشر الخطوة الأولى */}
      {!hasPreview && (
        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-[#8a7a52]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#b79d56] text-[.7rem] font-bold text-white shadow-sm">
            ١
          </span>
          <span className="font-semibold">أدخل الاسم الكامل</span>
        </div>
      )}

      {/* بطاقة النموذج */}
      <div className="rounded-2xl border border-[#c5b074]/40 bg-white/88 p-6 shadow-[0_16px_48px_-16px_rgba(80,60,15,.28)] backdrop-blur-sm">
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <label htmlFor="fullName" className="sr-only">
            الاسم الكامل
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="أدخل الاسم هنا"
            className="h-12 w-full rounded-full border border-[#bda35b]/60 bg-[#fdfaf3] px-5 text-center text-base text-[#2f2b21] outline-none transition placeholder:text-[#b0a47e] focus:border-[#937832] focus:bg-white focus:ring-4 focus:ring-[#c2a95e]/18"
            maxLength={40}
          />

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={disableSubmit}
              className="inline-flex h-12 min-w-52 items-center justify-center gap-2.5 rounded-full bg-linear-to-b from-[#c5aa62] to-[#9e8440] px-8 text-base font-bold text-white shadow-[0_6px_22px_-8px_rgba(80,60,10,.55)] transition hover:brightness-110 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-55"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                  <span>جاري الإنشاء...</span>
                </>
              ) : hasPreview ? (
                "تحديث البطاقة"
              ) : (
                "إنشاء البطاقة"
              )}
            </button>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-center text-sm text-red-700">
              {error}
            </div>
          )}
        </form>
      </div>

      {/* معاينة البطاقة */}
      {hasPreview && (
        <CardPreview imageUrl={previewUrl} fullName={fullName} onReset={handleReset} />
      )}
    </div>
  );
}
