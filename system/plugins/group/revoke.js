module.exports = {
  command: "resetlink",
  alias: ["revoke"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "لإعادة تعيين رابط المجموعة",
  async run(m, { sock }) {
    await sock
      .groupRevokeInvite(m.cht)
      .then((a) =>
        m.reply("> *- الرابط الجديد للمجموعة :* https://chat.whatsapp.com/" + a),
      );
  },
};