const moment = require("moment-timezone");
const pkg = require(process.cwd() + "/package.json");
const axios = require('axios');
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
    command: "اوامر",
    alias: ["menu", "help"],
    category: ["main"],
    description: "عرض قائمة أوامر البوت",
    loading: true,
    async run(m, { sock, plugins, config, Func }) {
    let data = fs.readFileSync(process.cwd() + "/system/case.js", "utf8");
    let casePattern = /case\s+"([^"]+)"/g;
    let matches = data.match(casePattern);
    if (!matches) return m.reply("لم يتم العثور على أي حالة.");
    matches = matches.map((match) => match.replace(/case\s+"([^"]+)"/, "$1"));   
    let menu = {};
    plugins.forEach((item) => {
      if (item.category && item.command && item.alias && item.description) {
        item.category.forEach((cat) => {
          if (!menu[cat]) {
            menu[cat] = { command: [] };
          }
          menu[cat].command.push({
            name: item.command,
            alias: item.alias,
            description: item.description,
            settings: item.settings,
          });
        });
      }
    });
    let cmd = 0;
    let alias = 0;
    let pp = await sock.profilePictureUrl(m.sender, 'image').catch(e => 'https://files.catbox.moe/8getyg.jpg')
   Object.values(menu).forEach(category => {
       cmd += category.command.length
          category.command.forEach(command => {
            alias += command.alias.length; 
        });
    });
      let premium = db.list().user[m.sender].premium.status
    let limit = db.list().user[m.sender].limit
      let caption = `* ⚡ مرحباً بك في القائمة*
اسمي edgar - إليك قائمة أوامر هذا البوت

*– 乂 معلومات المستخدم*
> *- الاسم:* ${m.pushName}
> *- الرقم:* @${m.sender.split("@")[0]}
> *- الحالة:* ${m.isOwner ? "مطور البوت" : premium ? "مميز" : "مجاني"}
> *- الحد:* ${m.isOwner ? "غير محدود" : limit}

*– 乂 معلومات البوت*
> *- الاسم:* ${pkg.name}
> *- الإصدار:* v${pkg.version}
> *- البادئة:* [ ${m.prefix} ]
> *- إجمالي الأوامر:* ${cmd + matches.length}
> *- قناة البوت:* https://whatsapp.com/channel/0029VayqYQDBVJl5mVZsit1G


☎️ إذا اكتشفت خطأ في البوت، يمكنك مراسلة بمطور البوت مباشرة.

*– 乂 قائمة الأوامر الأخرى*

${matches.map((a, i) => `*${i + 1}.* ${m.prefix + a}\n> ميزة جانبية (ميزة الحالة)`).join("\n")} 
`
Object.entries(menu).forEach(([tag, commands]) => {
    caption += `\n*– 乂 قائمة الأوامر – ${tag.split('').join(' ').capitalize()}*\n\n`;
    commands.command.forEach((command, index) => {
        caption += `*${index + 1}.* ${m.prefix + command.name} ${command.settings?.limit ? "*[L]*" : ''}\n${command.description ? `> ${command.description}\n` : ''}`
            });
      });   
      m.reply({
           image: {
               url: "https://qu.ax/Hvjxc.jpg"
           },
           caption,
           mentions: [m.sender],
           footer: config.name,
           buttons: [{
             buttonId: ".owner",
               buttonText: {
                   displayText: "صاحب البوت 🇲🇦"
              }
          },{
             buttonId: ".ping",
               buttonText: {
                   displayText: "🧧 معلومات البوت"
              }
          },{
             buttonId: ".channel",
               buttonText: {
                   displayText: " ⚡ قناة صانع البوت"
              }
          }],
          viewOnce: true,
          headerType: 6,
       })
    }
}
