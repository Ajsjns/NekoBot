const { getUrlInfo } = require("baileys");

async function events(m, { sock, Func }) {
  if (!m.isGroup) return
  let group = db.list().group[m.cht]
  if (Func.isUrl(m.body) && /chat.whatsapp.com/.test(m.body)) {
    if (!m.isBotAdmin) return
    let link = await getUrlInfo(Func.isUrl(m.body).find((a) => a.includes("chat.whatsapp.com")));
    let msg = `*– 乂 تم اكتشاف رابط مجموعة!*\n`
        msg += `> *- الوسم :* @${m.sender.split("@")[0]}\n`
        msg += `> *- الحالة :* ${m.isAdmin ? "مشرف في المجموعة" : "عضو في المجموعة"}`
        msg += `\n\n${m.isAdmin ? `> أنت آمن لأنك مشرف في المجموعة ${m.metadata.subject}` :   `> عذرًا، لا يُسمح لك بإرسال رابط *${link.title}* ابحث عن مجموعة أخرى فقط 😹`}`
    if (!m.isAdmin) return m.reply(msg)
      .then(() => {
        m.reply({ delete: m.key });
      })
  }
}

module.exports = { events }