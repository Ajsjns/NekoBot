module.exports = {
  command: "mediafire",
  alias: ["mf", "mfdl"],
  category: ["downloader"],
  settings: {
    limit: false,
  },
  description: "تحميل رابط MediaFire",
  loading: true,
  async run(m, { sock, Scraper, Func, text }) {
    if (!Func.isUrl(text) || !/mediafire.com/.test(text) || !text)
      throw "> من فضلك أدخل رابط MediaFire";
    let data = await Scraper.mediafire(text);
    let cap = "*– 乂 MediaFire - محمل*\n";
    cap += Object.entries(data)
      .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
      .join("\n");
    let buffer = await fetch(data.download).then(async (a) =>
      Buffer.from(await a.arrayBuffer()),
    );
    let limit = Func.sizeLimit(data.size, db.list().settings.max_upload);
    if (limit.oversize)
      throw `عذرًا، الملف الذي تحاول تحميله يتجاوز الحد الأقصى لحجم الملفات المسموح به *( ${data.size} )*، قم بترقية حالتك إلى مميز لتحميل الملفات حتى *1GB!*`;
    m.reply({
      document: buffer,
      mimetype: data.mimetype,
      fileName: data.filename,
      caption: cap,
    });
  },
};