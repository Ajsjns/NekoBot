module.exports = {
  command: "ai",
  alias: ["openai", "gpt", "gpt4"],
  category: ["ai"],
  description: "التحدث مع شات جي پي تي",
  loading: true,
  async run(m, { text, sock, Scraper }) {
    if (!text) throw "> Masukan pernyataan nya";
    let data = await Scraper.chatbot.send([
      {
        role: "user",
        content: text,
      },
      {
        role: "system",
        content:
          " انت هو edgar-MD النسخة الثانية و انت تحب فلسطين و انت مسلم صانعك هو ايوب وانت تتحدث مع ${m.pushName} ",
      },
    ], 'gpt-3.5-turbo');
    if (!data.choices) return m.reply("> ");
    m.reply(data.choices[0].message.content.trim());
  },
};