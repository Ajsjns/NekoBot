const axios = require("axios");

module.exports = {
  command: "spotify",
  alias: [],
  category: ["downloader"],
  settings: {
    limit: false,
  },
  description: "البحث/تحميل الموسيقى من سبوتيفاي",
  loading: true,
  async run(m, { sock, Func, Scraper, text }) {
    if (!text)
      throw `> *乂 طريقة الاستخدام :*
> *-* أدخل الاستعلام للبحث عن الفيديو
> *-* أدخل الرابط لتحميل الموسيقى

> *乂 مثال على الاستخدام :*
> *- ${m.prefix + m.command} فيديو مضحك*
> *- ${m.prefix + m.command} https://open.spotify.com/track/057YRaQ57p70MVg4hMIIkB*`;

    if (/open.spotify.com/.test(text)) {
      let data = await Scraper.spotify.download(text);
      m.reply({
        audio: {
          url: data.download,
        },
        mimetype: "audio/mpeg",
      });
    } else {
      let data = await Scraper.spotify.search(text);
      let cap = `*– 乂 سبوتيفاي - بحث*
`;
      cap += `> اكتب *${m.prefix + m.command} ${data[0].url}* لتحميل الموسيقى من سبوتيفاي\n\n`;
      cap += data
        .map((a) =>
          Object.entries(a)
            .map(([b, c]) => `> *- ${b.capitalize()} :* ${c}`)
            .join("\n"),
        )
        .join("\n\n");
      m.reply(cap);
    }
  },
};