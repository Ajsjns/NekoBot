const axios = require("axios");

module.exports = {
  command: "facebook",
  alias: ["fb", "fbdl"],
  category: ["downloader"],
  settings: {
    limit: false,
  },
  description: "تحميل الفيديو من فيسبوك",
  loading: true,
  async run(m, { sock, Scraper, Text, Func, text }) {
    // التحقق من أن الرابط المدخل هو رابط فيسبوك صالح
    if (!/facebook.com|fb.watch/.test(text) || !text)
      throw "> من فضلك أدخل رابط فيسبوك";

    try {
      // جلب بيانات الفيديو من فيسبوك
      let data = await Scraper.facebook(text);
      let random = data.media[0]; // الحصول على رابط الوسائط
      let buffer = await fetch(random).then(async (a) =>
        Buffer.from(await a.arrayBuffer())
      );

      // تنسيق حجم الملف والتحقق من الحدود
      let size = Func.formatSize(buffer.length);
      let limit = await Func.sizeLimit(size, db.list().settings.max_upload);
      if (limit.oversize)
        throw `عذرًا، لا أستطيع تحميل هذا الفيديو من فيسبوك لأنه يتجاوز الحد الأقصى لحجم الفيديو *( ${size} )*، قم بترقية حالتك إلى مميز لتحميل ملفات بحجم يصل إلى *1GB* !`;

      // إعداد الوصف المرسل للمستخدم
      let cap = "*– 乂 Facebook Downloader*\n";
      cap += Object.entries(data.metadata)
        .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
        .join("\n");

      // إرسال الفيديو إلى المستخدم
      sock.sendFile(m.chat, buffer, null, cap, m);
    } catch (error) {
      console.error("حدث خطأ:", error);
      m.reply("> فشل في تحميل الفيديو، يرجى المحاولة مرة أخرى.");
    }
  },
};