const yts = require("yt-search");
const axios = require("axios");

module.exports = {
  command: "play",
  alias: [],
  category: ["downloader"],
  settings: {
    limit: true
  },
  description: "البحث عن الصوت أو الفيديو من يوتيوب",
  async run(m, { sock, text }) {
    if (!text) return m.reply("> الرجاء إدخال نص البحث أو رابط يوتيوب");

    m.reply("> يرجى الانتظار قليلاً...");

    let videoUrl = "";
    if (/https:\/\/(youtube\.com|youtu\.be)/.test(text)) {
      videoUrl = text;
    } else {
      const searchResult = await yts(text);
      videoUrl = searchResult.videos[0]?.url;
      if (!videoUrl) return m.reply("> لم يتم العثور على فيديو لهذا البحث");
    }

    try {
      const { data } = await axios.get(
        `https://api.betabotz.eu.org/api/download/ytmp4?url=${videoUrl}&apikey=btzKiyoEditz`
      );

      if (!data || !data.result) {
        return m.reply("> فشل في جلب البيانات، يرجى المحاولة لاحقاً");
      }

      const { title, mp3, mp4, thumb } = data.result;

      let caption = `*– 乂 YouTube - Play*\n`;
      caption += `> *العنوان:* ${title}\n\n> Edgar-MD`;

      // إرسال البيانات
      await sock.sendMessage(m.cht, {
        image: { url: thumb },
        caption
      }, { quoted: m });

      // إرسال الصوت
      await sock.sendMessage(m.cht, {
        audio: { url: mp3 },
        mimetype: "audio/mpeg",
        fileName: `${title}.mp3`
      }, { quoted: m });

      // إرسال الفيديو
      await sock.sendMessage(m.cht, {
        video: { url: mp4 },
        mimetype: "video/mp4",
        fileName: `${title}.mp4`
      }, { quoted: m });
    } catch (error) {
      console.error(error);
      m.reply("> حدث خطأ أثناء معالجة طلبك.");
    }
  }
};