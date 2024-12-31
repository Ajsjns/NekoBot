const fs = require("node:fs");

module.exports = {
  command: "plugins",
  alias: ["plugin"],
  category: ["owner"],
  settings: {
    owner: true,
  },
  description: "لإدارة إضافات البوت",
  async run(m, { sock, Func, text, config }) {
    let src = pg.plugins;
    if (!text)
      throw `> *- 乂 طريقة الاستخدام*\n> *\`--get\`* للحصول على الإضافة\n> *\`--add\`* لإضافة الإضافة\n> *\`--delete\`* لحذف الإضافة\n\n> *- 乂 قائمة الإضافات المتوفرة :*\n${Object.keys(
        src,
      )
        .map((a, i) => `> *${i + 1}.* ${a.split("/plugins/")[1]}`)
        .join("\n")}`;

    if (text.includes("--get")) {
      let input = text.replace("--get", "").trim();
      if (!isNaN(input)) {
        let list = Object.keys(src).map((a) => a.split("/plugins/")[1]);
        let file = pg.directory + "/" + list[parseInt(input) - 1];
        try {
          m.reply(fs.readFileSync(file.trim()).toString());
        } catch (e) {
          m.reply(
            `> الإضافة ${file} غير موجودة، تحقق من قائمة الإضافات المحفوظة لديك`,
          );
        }
      } else {
        try {
          let file = pg.directory + "/" + input;
          m.reply(fs.readFileSync(file.trim()).toString());
        } catch (e) {
          m.reply(
            `> الإضافة ${input} غير موجودة، تحقق من قائمة الإضافات المحفوظة لديك`,
          );
        }
      }
    } else if (m.text.includes("--add")) {
      if (!m.quoted) throw "> الرد على الإضافة التي تريد حفظها";
      let input = m.text.replace("--add", "").trim();
      try {
        let file = pg.directory + "/" + input + ".js";
        fs.writeFileSync(file.trim(), m.quoted.body);
        m.reply("> تم حفظ الإضافة بنجاح: " + input);
      } catch (e) {
        m.reply(`> فشل في حفظ الإضافة، حاول مرة أخرى`);
      }
    } else if (text.includes("--delete")) {
      let input = text.replace("--delete", "").trim();
      if (!isNaN(input)) {
        let list = Object.keys(src).map((a) => a.split("/plugins/")[1]);
        let file = pg.directory + "/" + list[parseInt(input) - 1];
        try {
          fs.unlinkSync(file.trim());
          m.reply("> تم حذف الإضافة بنجاح");
        } catch (e) {
          m.reply(
            `> الإضافة ${file} غير موجودة، تحقق من قائمة الإضافات المحفوظة لديك`,
          );
        }
      } else {
        try {
          let file = pg.directory + "/" + input;
          fs.unlinkSync(file.trim());
          m.reply("> تم حذف الإضافة بنجاح");
        } catch (e) {
          m.reply(
            `> الإضافة ${input} غير موجودة، تحقق من قائمة الإضافات المحفوظة لديك`,
          );
        }
      }
    }
  },
};