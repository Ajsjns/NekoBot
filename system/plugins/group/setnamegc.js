module.exports = {
  command: "setnamegroup",
  alias: ["setnamegc"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "لتغيير اسم المجموعة",
  async run(m, { sock, text }) {
    if (!text) throw "> الرجاء إدخال اسم المجموعة الجديد";
    if (text.length > 20) throw "> الاسم طويل جداً، الحد الأقصى 20 حرف!";
    await sock.groupUpdateSubject(m.cht, text);
    m.reply(
      `> *تم تغيير اسم المجموعة إلى :*
 > ${text}`,
    );
  },
};