module.exports = {
  command: "channel",
  alias: ["credit"],
  category: ["info"],
  description: "قناة واتساب صانع البوت",
  async run(m) {
    let cap = `*>_ يرجى المتابعة :*
        
*– قناة الواتساب :*
https://whatsapp.com/channel/0029VauJgduEwEjwwVwLnw37;
    m.reply(cap);
  },
};
