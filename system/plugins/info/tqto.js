module.exports = {
  command: "channel",
  alias: ["c"],
  category: ["info"],
  description: "قناة صاحب البوت",
  async run(m) {
    let cap = `*>_ قناتي للتشجيع :*
        
> *-* https://whatsapp.com/channel/0029VayqYQDBVJl5mVZsit1G`;
    m.reply(cap);
  },
};
