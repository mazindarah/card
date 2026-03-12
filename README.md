# مولد بطاقات المعايدة العربية

تطبيق Production-ready مبني بـ **Next.js App Router + TypeScript + Tailwind CSS** لتوليد بطاقة معايدة عربية مخصصة مع إخراج **PNG حقيقي من الخادم**.

## المزايا

- واجهة عربية كاملة RTL
- إدخال الاسم الكامل مع تنظيف وتحقق صارم
- API خادمي لتوليد صورة PNG فعلية (ليس HTML overlay)
- دعم الخط العربي المحلي داخل التوليد
- ضبط تلقائي لحجم الخط داخل صندوق نص ثابت دون تجاوز الحدود
- معاينة مباشرة + تنزيل البطاقة
- قوالب قابلة للتبديل للمناسبات: عيد، رمضان، اليوم الوطني، يوم التأسيس

## هيكل المشروع

- `app/page.tsx`
- `app/api/generate-card/route.ts`
- `components/NameForm.tsx`
- `components/CardPreview.tsx`
- `lib/validate-name.ts`
- `lib/sanitize-name.ts`
- `lib/text-layout.ts`
- `lib/image-generator.ts`
- `config/card-template.ts`
- `public/templates/eid-card.png`
- `public/fonts/Cairo.ttf`
- `public/logo.png`

## تشغيل محلي

1. تثبيت الحزم:

```bash
npm install
```

2. تشغيل التطوير:

```bash
npm run dev
```

3. فتح:

```text
http://localhost:3000
```

4. بناء نسخة إنتاج:

```bash
npm run build
npm start
```

## سلوك التحقق من الاسم

- الاسم الكامل مطلوب
- حذف المسافات الزائدة وTrim تلقائي
- منع الإدخال الفارغ أو المكوّن من مسافات
- رفض الرموز غير المسموحة
- رفض التكرار المبالغ فيه للأحرف والعلامات
- رفض كلمات إساءة شائعة
- السماح بالأسماء العربية والإنجليزية الرسمية
- رفض الأسماء الطويلة جدا برسالة عربية واضحة

## تخصيص مكان الاسم على البطاقة

كل الإعدادات داخل `config/card-template.ts` عبر كائن `textBox`:

```ts
textBox: {
	x: 280,
	y: 1652,
	width: 520,
	height: 74,
	fontFamily: "Cairo",
	fontSize: 48,
	minFontSize: 24,
	lineHeight: 1,
	textColor: "#F8F5EE",
	textAlign: "center",
	paddingX: 24,
	paddingY: 6,
	offsetX: 0,
	offsetY: 2,
	fitScale: 0.9,
	debugBox: false,
}
```

يمكنك تغيير القالب النشط عبر `activeTemplate` داخل نفس الملف.

## صور أمثلة مولدة فعليا

- `public/examples/sample-alfatih-en.png`
- `public/examples/sample-alfatih-ar.png`

تم توليدهما من API باستخدام:

- `Alfatih Hassan Abdalla`
- `الفات حسن عبدالله`
"# darah_card" 
