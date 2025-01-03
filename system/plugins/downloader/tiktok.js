module.exports = {
  command: "تيك",
  alias: ["tt", "ttdl", "tiktokdl"],
  category: ["downloader"],
  settings: {
    limit: false,
  },
  description: "تحميل الفيديو/الشرائح من تيك توك",
  loading: true,
  async run(m, { sock, Func, text, Scraper, config }) {
    if (!Func.isUrl(m.text) || !/tiktok.com/.test(m.text) || !m.text)
      throw `> رد أو أدخل رابط تيك توك الذي ترغب في تحميله`;

    await Scraper.tiktok.download(m.text).then(async (a) => {
      let size = Func.formatSize(a.size);
      let limit = Func.sizeLimit(size, db.list().settings.max_upload);
      if (limit.oversize)
        return m.reply(
          `> عذرًا، لا يمكن تشغيل الفيديو لأنه يتجاوز الحجم الأقصى *( ${size} )*، الحجم الأقصى للمستخدمين المجانيين هو *50MB*، قم بالترقية إلى المميز لزيادة الحد الأقصى إلى *1GB*!`,
        );

      let cap = `*– 乂 تيك توك - محمل*\n`;
      cap += `> *- الدولة :* ${a.region}\n`;
      cap += `> *- المدة :* ${Func.toTime(a.duration)}\n`;
      cap += `> *- حجم الملف :* ${Func.formatSize(a.size)}\n`;
      cap += `> *- عدد المشاهدات :* ${Func.h2k(a.play_count)}\n`;
      cap += `> *- النوع :* ${a.images ? "عرض الشرائح" : "فيديو"}`;
      await sock.sendFile(m.cht, a.author.avatar, null, cap, m);
      if (a.images) {
        for (let i of a.images) {
          await sock.sendFile(m.cht, i, null, cap, m);
        }
      } else {
        let q = await sock.sendFile(m.cht, a.play, null, cap, m);
        await sock.sendFile(m.cht, a.music_info.play, null, "", m, {
          mimetype: "audio/mpeg",
          contextInfo: {
            externalAdReply: {
              title: a.music_info.title,
              body: a.music_info.play,
              mediaType: 1,
              thumbnailUrl: a.music_info.cover,
              renderLargerThumbnail: true,
            },
          },
        });
      }
    });
  },
};
