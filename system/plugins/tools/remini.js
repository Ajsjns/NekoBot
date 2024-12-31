module.exports = {
  command: "remini",
  alias: ["hdr", "hd"],
  category: ["tools"],
  settings: {
    limit: false,
  },
  description: "حسن جودة صورتك!",
  loading: true,
  async run(m, { sock, Scraper, Func }) {
    let q = m.quoted ? m.quoted : m;
    if (!/image/.test(q.msg.mimetype) || !q.isMedia)
      throw `> الرجاء الرد على الصورة التي تريد تحسينها أو إرسال صورة جديدة`;
    let buffer = await q.download();
    let data = await Scraper.remini(buffer);
    let size = Func.formatSize(data.length);
    m.reply({
      image: data,
      caption: `*– 乂 Remini - صورة*\n> *- حجم الصورة :* ${size}`,
    });
  },
};