import Image from "next/image";
import { NameForm } from "@/components/NameForm";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f6f1e4]">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_0%,rgba(29,91,63,.14)_0%,transparent_42%),linear-gradient(120deg,rgba(174,147,73,.08)_0%,transparent_48%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-35 bg-[repeating-linear-gradient(90deg,rgba(29,91,63,.035)_0,rgba(29,91,63,.035)_1px,transparent_1px,transparent_34px)]" />

      {/* زخارف حكومية علوية */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
        <Image
          src="/motifs/frame22.svg"
          alt="زخرفة علوية"
          width={1440}
          height={24}
          className="h-5 w-full object-cover opacity-80"
          priority
        />
      </div>

      <div className="relative mx-auto w-full max-w-5xl flex-1 px-4 pb-8 pt-18 md:pt-22">
        <header className="mb-11 flex flex-col items-center text-center animate-[fadeSlide_.7s_ease-out]">
          <div className="mb-6 flex h-22.5 w-22.5 items-center justify-center rounded-full border border-[#c9b36a]/55 bg-white/95 shadow-[0_10px_32px_-20px_rgba(18,76,48,.60),0_0_0_6px_rgba(201,179,106,.12)]">
            <Image
              src="/logo.png"
              alt="شعار دارة الملك عبدالعزيز"
              width={70}
              height={84}
              priority
              className="h-auto w-13"
            />
          </div>

          <div className="mb-5 flex items-center gap-3 text-[#1d5b3f]">
            <div className="h-px w-16 bg-linear-to-l from-[#1d5b3f]/65 to-transparent" />
            <span className="text-base leading-none text-[#b89b4a]">✦</span>
            <div className="h-px w-16 bg-linear-to-r from-[#1d5b3f]/65 to-transparent" />
          </div>

          <h1 className="mb-3 text-[1.65rem] font-extrabold tracking-tight text-[#1c3f2f] md:text-[2.25rem]">
            بطاقة المعايدة الإلكترونية
          </h1>
          <p className="max-w-md text-[.94rem] leading-loose text-[#5e654f] md:text-[1rem]">
            أنشئ بطاقة معايدة شخصية من دارة الملك عبدالعزيز،
            <br className="hidden md:block" />
            أدخل اسمك وحمّل بطاقتك في ثوانٍ.
          </p>
        </header>

        <section className="rounded-3xl border border-[#cdbb87]/45 bg-white/78 p-4 shadow-[0_26px_64px_-34px_rgba(20,70,44,.52)] backdrop-blur-sm md:p-7 animate-[fadeSlide_.85s_ease-out]">
          <NameForm />
        </section>
      </div>

      <footer className="mt-auto overflow-hidden pt-1">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4">
          <p className="mb-2.5 text-center text-[.8rem] font-semibold tracking-[.01em] text-[#3f5e4a] md:mb-3 md:text-xs">
            جميع الحقوق محفوظة لدارة الملك عبدالعزيز &copy; 2026
          </p>
        </div>

        <div className="mt-0">
          <Image
            src="/motifs/frame22.svg"
            alt="زخرفة الفوتر"
            width={1440}
            height={24}
            className="block h-3.5 w-full object-cover object-top opacity-80"
          />
        </div>
      </footer>
    </main>
  );
}
