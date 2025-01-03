module.exports = {
  command: "الرابط",
  alias: ["linkgc"],
  category: ["group"],
  settings: {
    group: true,
    botAdmin: true,
  },
  description: "لأخذ رابط المجموعة",
  async run(m, { sock }) {
    let link =
      "https://chat.whatsapp.com/" + (await sock.groupInviteCode(m.cht));
    m.reply(`*– 乂 ${m.metadata.subject}*\n> *- الرابط :* ${link}`);
  },
};
