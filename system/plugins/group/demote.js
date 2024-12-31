module.exports = {
  command: "demote",
  alias: ["jadimember"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "لتحويل المسؤول إلى عضو",
  async run(m, { sock, text }) {
    let who = m.quoted
      ? m.quoted.sender
      : m.mentions.length > 0
        ? m.mentions[0]
        : false;
    if (!who) throw "> الرجاء وضع تاغ أو الرد على الرسالة لتحويل المسؤول إلى عضو";
    let user = await sock.onWhatsApp(who);
    if (!user[0].exists) throw "> العضو غير مسجل في WhatsApp";
    await sock
      .groupParticipantsUpdate(m.cht, [who], "demote")
      .then((a) => m.reply("> تم خفض رتبتك من المسؤول إلى عضو"));
  },
};