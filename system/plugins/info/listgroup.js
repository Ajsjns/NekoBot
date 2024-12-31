module.exports = {
  command: "listgroup",
  alias: ["gcl", "listgroup"],
  category: ["info"],
  settings: {
    limit: false,
    owner: true,
  },
  description: "> قائمة مجموعات الدردشة للبوت",
  async run(m, { sock, Func, store }) {
    let data = Object.values(store.groupMetadata);
    let cap = "*– 乂 قائمة - المجموعات*\n";
    cap += `> *- الإجمالي :* ${data.length}\n\n`;
    cap += data
      .sort((a, b) => b.creation - a.creation)
      .map(
        (a, i) =>
          `> *${i + 1}.* ${a.subject}\n> *- تم الإنشاء :* ${Func.ago(a.creation * 1000)}\n> *- إجمالي الأعضاء :* ${a.size}\n> *- مالك المجموعة :* ${a.owner ? "@" + a.owner.split("@")[0] : "لا يوجد مالك"}`,
      )
      .join("\n\n");

    m.reply(cap);
  },
};