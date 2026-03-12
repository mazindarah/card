import Image from "next/image";
import { NameForm } from "@/components/NameForm";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f7f2e5]">
      {/* خلفية متدرجة علوية */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_120%_50%_at_50%_-5%,#ede3c2_0%,transparent_60%)]" />
      {/* شبكة خفيفة */}
      <div className="pointer-events-none absolute inset-0 opacity-25 bg-[repeating-linear-gradient(0deg,rgba(178,148,64,.08)_0,rgba(178,148,64,.08)_1px,transparent_1px,transparent_48px),repeating-linear-gradient(90deg,rgba(178,148,64,.08)_0,rgba(178,148,64,.08)_1px,transparent_1px,transparent_48px)]" />

      <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-12 md:pt-16">

        {/* ── الهيدر ── */}
        <header className="mb-12 flex flex-col items-center text-center">

          {/* دائرة الشعار */}
          <div className="mb-6 flex h-22.5 w-22.5 items-center justify-center rounded-full border border-[#c9b36a]/50 bg-white/95 shadow-[0_4px_28px_rgba(120,95,35,.20),0_0_0_6px_rgba(201,179,106,.12)]">
            <Image
              src="/logo.png"
              alt="شعار دارة الملك عبدالعزيز"
              width={70}
              height={84}
              priority
              className="h-auto w-13"
            />
          </div>

          {/* فاصل زخرفي */}
          <div className="mb-5 flex items-center gap-3 text-[#c2a854]">
            <div className="h-px w-16 bg-linear-to-l from-[#c2a854]/60 to-transparent" />
            <span className="text-lg leading-none">❖</span>
            <div className="h-px w-16 bg-linear-to-r from-[#c2a854]/60 to-transparent" />
          </div>

          <h1 className="mb-3 text-[1.6rem] font-extrabold tracking-tight text-[#2e2815] md:text-[2.1rem]">
            بطاقة المعايدة الإلكترونية
          </h1>
          <p className="max-w-md text-[.93rem] leading-loose text-[#6a6040] md:text-[1rem]">
            أنشئ بطاقة معايدة شخصية من دارة الملك عبدالعزيز،
            <br className="hidden md:block" />
            أدخل اسمك وحمّل بطاقتك في ثوانٍ.
          </p>
        </header>

        {/* ── النموذج الرئيسي ── */}
        <NameForm />

      </div>

      {/* فوتر */}
      <footer className="relative mt-10 pb-7 pt-8">
        <div className="mx-auto mb-4 h-px w-full max-w-xl bg-linear-to-r from-transparent via-[#c8b072]/60 to-transparent" />
        <div className="mx-auto w-fit rounded-full border border-[#c8b072]/45 bg-white/70 px-5 py-2 shadow-[0_10px_24px_-16px_rgba(90,70,20,.65)] backdrop-blur-sm">
          <p className="text-center text-[.78rem] font-medium tracking-[.01em] text-[#8b7a4c] md:text-xs">
            دارة الملك عبدالعزيز &copy; 2026 &mdash; جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </main>
  );
}
