const undici = require("undici");
const { extension } = require("mime-types");
const { html } = require("js-beautify");

module.exports = {
  command: "get",
  alias: ["fetch"],
  category: ["tools"],
  description: "الحصول على البيانات من الرابط",
  loading: true,
  async run(m, { sock, Func, text, config }) {
    if (!text) throw `> الرجاء إدخال أو الرد على الرابط الذي تريد جلب البيانات منه`;
    for (let i of isUrl(text)) {
      let data = await undici.fetch(i);
      let mime = data.headers.get("content-type").split(";")[0];
      let cap = `*– 乂 Fetch - Url*\n> *- الرابط :* ${i}`;
      let body;
      if (/\html/gi.test(mime)) {
        body = await data.text();
      } else if (/\json/gi.test(mime)) {
        body = await data.json();
      } else if (/image/gi.test(mime)) {
        body = await data.arrayBuffer();
      } else if (/video/gi.test(mime)) {
        body = await data.arrayBuffer();
      } else if (/audio/gi.test(mime)) {
        body = await data.arrayBuffer();
      } else {
        try {
          body = await data.buffer();
        } catch (e) {
          body = await data.text();
        }
      }
      if (/\html/gi.test(mime)) {
        await sock.sendMessage(
          m.cht,
          {
            document: Buffer.from(html(body)),
            caption: cap,
            fileName: "result.html",
            mimetype: mime,
          },
          {
            quoted: m,
          },
        );
      } else if (/\json/gi.test(mime)) {
        m.reply(JSON.stringify(body, null, 2));
      } else if (/image/gi.test(mime)) {
        sock.sendFile(
          m.cht,
          Buffer.from(body),
          `result.${extension(mime)}`,
          cap,
          m,
        );
      } else if (/video/gi.test(mime)) {
        sock.sendFile(
          m.cht,
          Buffer.from(body),
          `result.${extension(mime)}`,
          cap,
          m,
        );
      } else if (/audio/gi.test(mime)) {
        sock.sendFile(
          m.cht,
          Buffer.from(body),
          `result.${extension(mime)}`,
          cap,
          m,
          {
            mimetype: mime,
          },
        );
      } else {
        m.reply(Func.jsonFormat(body));
      }
    }
  },
};

function isUrl(string) {
  let urlRegex = /(https?:\/\/[^\s]+)/g;
  let result = string.match(urlRegex);
  return result;
}