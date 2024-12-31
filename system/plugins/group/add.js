const bail = require('baileys');
const {
    generateWAMessageFromContent,
    proto,
    toNumber
} = bail

module.exports = {
  command: "add",
  alias: [],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "لإضافة عضو إلى المجموعة",
  async run(m, { sock, text }) {
      const input = m.input ? m.input : m.quoted ? m.quoted.sender : m.mentions.length > 0 ? m.mentions[0] : false
        if (!input) throw `> رد أو أدخل الرقم الذي تريد إضافته إلى المجموعة`
        const p = await sock.onWhatsApp(input.trim())
        if (p.length == 0) return m.reply('> الشخص لا يمتلك تطبيق واتساب')
        const jid = sock.decodeJid(p[0].jid)
        const member = m.metadata.participants.find(u => u.id == jid)
        if (member?.id) return m.reply('> الشخص موجود بالفعل في هذه المجموعة')
        const resp = await sock.groupParticipantsUpdate(
            m.cht,
            [jid],
            'add',
        );
        for (let res of resp) {
            if (res.status == 421) {
                m.reply(res.content.content[0].tag)
            }
            if (res.status == 408) {
                await m.reply(`> تم إرسال رابط المجموعة إلى @${parseInt(res.jid)} لأنه غادر المجموعة للتو!`);
                await sock.sendMessage(res.jid, {
                    text: "https://chat.whatsapp.com/" +
                        (await sock.groupInviteCode(m.cht)),
                });
            }
            if (res.status == 403) {
                await m.reply(`> تم إرسال دعوة إلى @${parseInt(res.jid)}`);
                const {
                    code,
                    expiration
                } = res.content.content[0].attrs;
                const pp = await sock.profilePictureUrl(m.cht).catch(() => null);
                const gp = await Func.fetchBuffer(pp)
                const msgs = generateWAMessageFromContent(
                    res.jid,
                    proto.Message.fromObject({
                        groupInviteMessage: {
                            groupJid: m.cht,
                            inviteCode: code,
                            inviteExpiration: toNumber(expiration),
                            groupName: await sock.getName(m.cht),
                            jpegThumbnail: gp || null,
                            caption: `> مرحبا @${m.res.jid.split("@")[0]}, أحد المسؤولين في *${m.metadata.subject}* دعاه للانضمام إلى المجموعة!`,
                        },
                    }), {
                        userJid: sock.user.jid
                    },
                );
                await sock.copyNForward(jid, msgs);
            }
        }
  },
};