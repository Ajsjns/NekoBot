module.exports = {
  command: "المطور",
  alias: ["owner"],
  category: ["info"],
  description: "مراسلة المطور",
  async run(m) {
    let cap = `> *مراسلة المطور :*
        
> *-* https://wa.me/967780420764`;
    m.reply(cap);
  },
};
