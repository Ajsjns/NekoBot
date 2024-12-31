module.exports = {
  command: "setdeskripsi",
  alias: ["setdesc"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "لتغيير وصف المجموعة",
  async run(m, { sock, text }) {
    if (!text) throw "> الرجاء إدخال الوصف الجديد للمجموعة";
    if (text.length > 200) throw "> الوصف طويل جداً، الحد الأقصى 200 حرف!";
    await sock.groupUpdateDescription(m.cht, text);
    m.reply(
      `> *تم تغيير وصف المجموعة إلى :*
 > ${text.trim()}`,
    );
  },
};