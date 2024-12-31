const fs = require("node:fs");

module.exports = {
  command: "scrape",
  alias: ["skrep", "scraper"],
  category: ["owner"],
  settings: {
    owner: true,
  },
  description: "لإدارة روبوت السحب",
  async run(m, { sock, Func, text, config }) {
    let src = await scraper.list();
    if (!text)
      throw `> *- 乂 طريقة الاستخدام*\n> *\`--get\`* لسحب البيانات\n> *\`--add\`* لإضافة سحب البيانات\n> *\`--delete\`* لحذف السحب\n\n> *- 乂 قائمة السحب المتاحة :*\n${Object.keys(
        src,
      )
        .map((a, i) => `> *${i + 1}.* ${a}`)
        .join("\n")}`;

    if (text.includes("--get")) {
      let input = text.replace("--get", "").trim();
      if (!isNaN(input)) {
        let list = Object.keys(src);
        try {
          let file = scraper.dir + "/" + list[parseInt(input) - 1] + ".js";
          m.reply(fs.readFileSync(file.trim()).toString());
        } catch (e) {
          m.reply(
            `> سحب ${list[parseInt(input) - 1]} غير موجود، تحقق من قائمة السحب المحفوظة لديك`,
          );
        }
      } else {
        try {
          let file = scraper.dir + "/" + input + ".js";
          m.reply(fs.readFileSync(file.trim()).toString());
        } catch (e) {
          m.reply(
            `> سحب ${input} غير موجود، تحقق من قائمة السحب المحفوظة لديك`,
          );
        }
      }
    } else if (m.text.includes("--add")) {
      if (!m.quoted) throw "> أعد الرد على السحب الذي تريد حفظه";
      let input = m.text.replace("--add", "").trim();
      try {
        let file = scraper.dir + "/" + input + ".js";
        fs.writeFileSync(file.trim(), m.quoted.body);
        m.reply("> تم حفظ السحب بنجاح : " + input);
      } catch (e) {
        m.reply(`> فشل في حفظ السحب، حاول مرة أخرى`);
      }
    } else if (text.includes("--delete")) {
      let input = text.replace("--delete", "").trim();
      if (!isNaN(input)) {
        let list = Object.keys(src);
        try {
          let file = scraper.dir + "/" + list[parseInt(input) - 1] + ".js";
          fs.unlinkSync(file.trim());
          m.reply("> تم حذف السحب بنجاح");
        } catch (e) {
          m.reply(
            `> سحب ${list[parseInt(input) - 1]} غير موجود، تحقق من قائمة السحب المحفوظة لديك`,
          );
        }
      } else {
        try {
          let file = scraper.dir + "/" + input + ".js";
          fs.unlinkSync(file.trim());
          m.reply("> تم حذف السحب بنجاح");
        } catch (e) {
          m.reply(
            `> سحب ${input} غير موجود، تحقق من قائمة السحب المحفوظة لديك`,
          );
        }
      }
    }
  },
};