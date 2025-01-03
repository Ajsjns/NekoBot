module.exports = {
  command: "انستا",
  alias: ["igdl", "ig", "igvideo", "igreel"],
  category: ["downloader"],
  settings: {
    limit: false,
  },
  description: "تحميل Reels / المنشورات من Instagram",
  loading: true,
  async run(m, { sock, Func, text, Scraper }) {
    if (!text) throw "> رد على الرسالة أو أدخل رابط من Instagram";
    if (!/instagram.com/.test(text)) throw "> يرجى إدخال رابط Instagram";
    
    let data = await Scraper.Instagram(text);
    if (!data) return;
    
    for (let i of data.url) {
      let res = await fetch(i);
      sock.sendFile(
        m.cht,
        Buffer.from(await res.arrayBuffer()),
        null,
        `*– 乂 تحميل Instagram*
${Object.entries(data.metadata)
  .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
  .join("\n")}`,
        m,
      );
    }
  },
};
