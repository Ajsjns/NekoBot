module.exports = {
  command: "tiktoksearch",
  alias: ["ttsearch"],
  category: ["downloader"],
  settings: {
    limit: false,
  },
  description: "> للبحث عن فيديوهات من تيك توك",
  loading: true,
  async run(m, { sock, Func, text, Scraper, config }) {
    if (!text) throw "> من فضلك أدخل ما تريد البحث عنه";
    let data = await Scraper.tiktok.search(text);
    let json = data.getRandom();
    let cap = "*– 乂 تيك توك - بحث*\n";
    cap += Object.entries(json.metadata)
      .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
      .join("\n");
    cap += "\n";
    cap += Object.entries(json.stats)
      .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
      .join("\n");
    m.reply({
      video: {
        url: json.media.no_watermark,
      },
      caption: cap,
    });
  },
};