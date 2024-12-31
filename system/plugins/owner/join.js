module.exports = {
  command: "join",
  alias: [],
  category: ["owner"],
  settings: {
    owner: false,
  },
  description: "إضافة البوت إلى المجموعة",
  async run(m, { sock, text, Func }) {
    if (!Func.isUrl(text) || !/chat.whatsapp.com/.test(text))
      throw "> الرجاء إدخال رابط المجموعة";
    let id = text.split("chat.whatsapp.com/")[1];
    await sock
      .groupAcceptInvite(id)
      .then((a) =>
        m.reply(
          a
            ? "> *تم انضمام البوت بنجاح!*"
            : "> *البوت في انتظار الموافقة للانضمام*",
        ),
      );
  },
};