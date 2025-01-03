module.exports = {
  command: "اعدادات",
  alias: [],
  category: ["owner"],
  settings: {
    owner: true,
  },
  description: "تغيير البوت إلى وضع الصمت",
  async run(m, { sock, text }) {
    if (!text)
      return m.reply({
        poll: {
          name: `*– 乂 طريقة الاستخدام*
> *\`0\`* لإيقاف ميزة الصمت
> *\`1\`* لتشغيل ميزة الصمت`,
          values: [`${m.prefix}self 0`, `${m.prefix}self 1`],
          selectableCount: 1,
        },
      });
    let settings = db.list().settings;
    settings.self = parseInt(text) > 0 ? true : false;
    m.reply(`> تم ${text < 1 ? "إيقاف" : "تشغيل"} ميزة الصمت`);
  },
};
