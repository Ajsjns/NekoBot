const path = require("node:path");
const serialize = require(path.resolve("./lib/serialize.js"));

module.exports = {
  command: "quoted",
  alias: ["q"],
  category: ["tools"],
  settings: {
    limit: false,
  },
  description: "لإعادة توجيه رسالة شخص آخر",
  async run(m, { sock, store }) {
    if (!m.quoted) throw "> الرجاء الرد على الرسالة التي تريد إعادة توجيهها";
    let loadMsg = await store.loadMessage(m.cht, m.quoted.id);
    if (!loadMsg.message) throw "> لا توجد رسالة لإعادة توجيهها!";
    let data = await serialize(loadMsg, sock, store);
    if (!data.quoted) throw "> لا توجد رسالة لإعادة توجيهها!";
    sock.copyNForward(m.cht, data.quoted, true);
  },
};