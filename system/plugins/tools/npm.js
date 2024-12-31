class Command {
  constructor() {
    this.command = "npm";
    this.alias = ["npmjs", "package"];
    this.category = ["tools"];
    this.settings = {
      limit: false
    };
    this.description = "البحث عن الحزم من NPM";
    this.loading = true;
  }

  run = async (m, { sock, Func, text, config }) => {
    if (!text) throw "> الرجاء إدخال اسم الحزمة";

    let data = await Func.fetchJson(`https://registry.npmjs.com/-/v1/search?text=${encodeURIComponent(text)}`);

    let cap = "*– 乂 NpmJS - البحث*\n";
    for (let i of data.objects.slice(0, 20)) {
      cap += `> *${i.package.name}@^${i.package.version}*\n`;
      cap += `> *- أسبوعي :* ${Func.h2k(i.downloads.weekly)} | *- شهري :* ${Func.h2k(i.downloads.monthly)}\n`;
      cap += `> *- الناشر :* ${i.package.publisher.username}\n`;
      cap += `> *- آخر تحديث :* ${Func.ago(i.package.date)}\n`;
      cap += Object.entries(i.package.links).map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`).join("\n");
      cap += "\n\n";
    }
    cap += `> © ${config.name}`;
    m.reply(cap);
  }
}

module.exports = new Command();