module.exports = {
  command: "قروب",
  alias: ["groupsetting", "settingc"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "لفتح/إغلاق المجموعة",
  loading: true,
  async run(m, { sock, text }) {
    if (!text)
      throw `*– 乂 طريقة الاستخدام*
> *-* *\`فتح\`* لفتح المجموعة
> *-* *\`إغلاق\`* لإغلاق المجموعة

*– 乂 مثال على الاستخدام*
> *-* ${m.prefix + m.command} فتح
> *-* ${m.prefix + m.command} إغلاق`;

    await sock
      .groupSettingUpdate(
        m.cht,
        text === "فتح" ? "not_announcement" : "announcement",
      )
      .then((a) =>
        m.reply(
          `> *-* تم ${text === "فتح" ? "فتح" : "إغلاق"} المجموعة`,
        ),
      );
  },
};
