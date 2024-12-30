const fs = require('node:fs');

const config = {
    owner: ["6285351971353", "6281910094713"],
    name: "Edgar-MD by Ayoub-Dev",
    sessions: "sessions",
    sticker: {
      packname: "Made by ",
      author: "Edgar-MD V2"
    },
   messages: {
      wait: "> يرجى الإنظار...",
      owner: "> هذا الامر فقط ل ayoub-Dev",
      premium: "> يجب ان تكون مشترك",
      group: "> هذا الامر فقط للمجموعات",
      botAdmin: "> أنت لست ادمن",
      grootbotbup: "> أنا لست مشرفا",
   },
   database: "neko-db",
   tz: "Africa/Casablanca"
}

module.exports = config

let file = require.resolve(__filename);
fs.watchFile(file, () => {
   fs.unwatchFile(file);
  delete require.cache[file];
});
