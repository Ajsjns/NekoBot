module.exports = {
  command: "say",
  alias: ["say"],
  category: ["tools"],
  description: "يرد عليك البوت بنفس الرسالة",
  loading: true,
  async run(m, { sock }) {
    if (!m.text) return m.reply("ادخل النص");
    m.reply(m.text);
  },
};
