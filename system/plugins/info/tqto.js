module.exports = {
  command: "channel",
  alias: ["c"],
  category: ["info"],
  description: "قروب صاحب البوت",
  async run(m) {
    let cap = `*> قروبي :*
        
> *-* https://chat.whatsapp.com/GIQRZXJwgDPErFXsOIbBEb`;
    m.reply(cap);
  },
};
