module.exports = {
  command: "promote",
  alias: ["jadiadmin", "newking"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "لترقية العضو ليصبح مشرفاً",
  async run(m, { sock, text }) {
    let who = m.quoted
      ? m.quoted.sender
      : m.mentions.length > 0
        ? m.mentions[0]
        : false;
    if (!who) throw "> الرجاء الإشارة أو الرد على رسالة العضو الذي ترغب في ترقيته";
    let user = await sock.onWhatsApp(who);
    if (!user[0].exists) throw "> العضو غير مسجل في WhatsApp";
    await sock
      .groupParticipantsUpdate(m.cht, [who], "promote")
      .then((a) => m.reply("> احترس، هناك مشرف جديد!"));
  },
};