module.exports = {
  command: "channel",
  alias: ["credit"],
  category: ["info"],
  description: "قناة صانع البوت",
  async run(m) {
    let cap = `*>_اشترك من فضلك_* :*
        
> *- Telegram :* https://whatsapp.com/channel/0029VayqYQDBVJl5mVZsit1G
    m.reply(cap);
  },
};
