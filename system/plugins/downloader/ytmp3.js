const axios = require("axios");

module.exports = {
  command: "ytmp3",
  alias: ["yta", "ytaudio"],
  category: ["downloader"],
  description: "تحميل الصوت من رابط YouTube",
  settings: {
    limit: false,
  },
  loading: true,
  async run(m, { sock, Func, Scraper, config, text }) {
    if (!/youtube.com|youtu.be/.test(text) || !text)
      throw "> يرجى إدخال رابط YouTube";
    
    let data = await Scraper.YouTube.mp3(text);
    let cap = `*– 乂 YouTube - صوت*\n`;
    cap += Object.entries(data.metadata)
      .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
      .join("\n");

    // حساب حجم الملف
    let size = await Func.formatSize(data.download.length);
    let limit = Func.sizeLimit(size, db.list().settings.max_upload);
    
    // التحقق من حجم الملف
    if (limit.oversize)
      throw `> فشل تحميل الصوت لأن حجم الملف كبير للمستخدمين العاديين *( ${size} )* ، يرجى ترقية حسابك إلى مميز لتحميل الصوت بحجم يصل إلى *1GB* !`;

    // إرسال الصورة مع التفاصيل
    m.reply({
      image: {
        url: data.metadata.thumbnail,
      },
      caption: cap,
    }).then((a) => {
      // إرسال الصوت
      m.reply({
        audio: data.download,
        mimetype: "audio/mpeg",
      });
    });
  },
};