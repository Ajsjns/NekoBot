const axios = require("axios");

module.exports = {
  command: "ytmp4",
  alias: ["ytv", "ytvideo"],
  category: ["downloader"],
  description: "تنزيل الفيديو من رابط YouTube",
  settings: {
    limit: false, // تم تعيين الحد إلى false
  },
  loading: true,
  async run(m, { sock, Func, Scraper, config, text }) {
    if (!/youtube.com|youtu.be/.test(text) || !text)
      throw "الرجاء إدخال رابط YouTube صحيح!";
      
    let data = await Scraper.YouTube.mp4(text);
    let cap = `*– 乂 YouTube - Video*\n`;
    cap += Object.entries(data.metadata)
      .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
      .join("\n");
      
    let size = await Func.formatSize(data.download.length);
    let limit = Func.sizeLimit(size, db.list().settings.max_upload);
    
    if (limit.oversize)
      throw `فشل تحميل الفيديو لأن حجم الملف *( ${size} )* يتجاوز الحد المسموح به للمستخدمين المجانيين. قم بالترقية إلى الحساب المميز لتحميل ملفات تصل إلى *1 جيجابايت*!`;
      
    m.reply({
      video: data.download,
      caption: cap,
    });
  },
};