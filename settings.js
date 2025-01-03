const fs = require('fs');

const config = {
    owner: ["967780420764"],
    name: "- Edgar-MD V2 - By ayoub-dev",
    sessions: "sessions",
    sticker: {
      packname: "Edgar - MD V2 by ",
      author: "ستيف"
    },
   messages: {
      wait: "> يرجى الانتظار لحظة...",
      owner: "> هذا الأمر مخصص فقط لصانع البوت",
      premium: "> قم بالترقية إلى البريميوم للوصول، السعر رخيص",
      group: "> ميزة خاصة للدردشة الجماعية فقط",
      botAdmin: "> من أنت؟ أنت لست مشرفًا في المجموعة",
      grootbotbup: "> يجب عليك جعل NekoBot مشرفًا أولاً قبل أن تتمكن من الوصول",
   },
   database: "neko-db",
   tz: "Africa/Casablanca"
}

module.exports = config;

// Fix for fs watch
let file = require.resolve(__filename);

// Watch the file for changes
fs.watchFile(file, (curr, prev) => {
   if (curr.mtime !== prev.mtime) { // Check if the file has been modified
      fs.unwatchFile(file); // Stop watching the file to avoid duplicate events
      delete require.cache[file]; // Clear the cached file to reload it
   }
});
