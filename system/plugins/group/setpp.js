module.exports = {
  command: "setppgroup",
  alias: ["setppgc"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "لتغيير صورة بروفايل المجموعة",
  async run(m, { sock }) {
    let q = m.quoted ? m.quoted : m;
    if (!q.isMedia)
      throw "> قم بالرد أو إرسال الصورة التي تريد تعيينها كصورة بروفايل للمجموعة";
    let buffer = await q.download();
    await sock
      .updateProfilePicture(m.cht, buffer)
      .then((a) => m.reply("> *تم تغيير صورة بروفايل المجموعة بنجاح!*"));
  },
};