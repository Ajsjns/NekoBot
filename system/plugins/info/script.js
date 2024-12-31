module.exports = {
  command: "owner",
  alias: ["owner"],
  category: ["info"],
  description: "مراسلة المطور",
  async run(m) {
    let cap = `*> مراسلة المطور :*
        
> *-* https://wa.me/212710723716?text=سلام+عليكم`;
    m.reply(cap);
  },
};
