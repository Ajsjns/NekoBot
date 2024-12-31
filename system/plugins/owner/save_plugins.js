const path = require("node:path");
const fs = require("node:fs");

module.exports = {
  command: "sp",
  category: ["owner"],
  alias: ["saveplugin"],
  description: "لحفظ ميزات البوت",
  settings: {
    owner: true,
  },
  loading: true,
  async run(m, { text, config, Func }) {
    if (!m.quoted) throw "> أعد الرد على الكود يا ملك 😎";
    if (!text) throw "> أدخل اسم الملف";
    m.reply(config.messages.wait);
    try {
      let locate = "system/plugins/";
      await fs.writeFileSync(locate + m.text, m.quoted.body);
      m.reply(
        `> تم حفظ الميزة بنجاح في الملف :\n> ${locate + m.text}`,
      );
    } catch (e) {
      m.reply("> ربما لم تقم بإنشاء هذا المجلد بعد");
    }
  },
};