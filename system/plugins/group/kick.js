module.exports = {
  command: "طرد",
  alias: ["kik", "dor", "tendang"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "لطرد عضو من المجموعة",
  async run(m, { sock, text }) {
    let who = m.quoted
      ? m.quoted.sender
      : m.mentions.length > 0
        ? m.mentions[0]
        : false;
    if (!who) throw "> الرجاء وضع تاغ أو الرد على الرسالة لطرد العضو";
    let user = await sock.onWhatsApp(who);
    if (!user[0].exists) throw "> العضو غير مسجل في WhatsApp";
    await sock
      .groupParticipantsUpdate(m.cht, [who], "remove")
      .then((a) => m.reply("> تم طرد العضو من المجموعة بنجاح 😹"));
  },
};
