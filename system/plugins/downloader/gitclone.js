const axios = require("axios");

const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+?)(?:[\/]|$)/i;

module.exports = {
   command: "gitclone",
   alias: ["gitdl", "githubdl"],
   settings: {
      limit: false
  },
  description: "تحميل مشروع من Github",
  loading: true,
  async run(m, { sock, Func, text }) {
      if (!Func.isUrl(text) && !/github.com/.test(text)) throw "> من فضلك أدخل رابط المستودع من جيت هاب!"
   let [_, author, repo] = text.match(regex);
   if (!author || !repo)  throw "> من فضلك أدخل رابط المستودع"
    repo.replace(/.git$/, "");
    let api = `https://api.github.com/repos/${author}/${repo}`  
    let { data } = await axios.get(api).catch(e => e.response);   
   let cap = `*– 乂 جيت هاب - استنساخ*\n`
      cap += `> *- الاسم :* ${data.name}\n`
      cap += `> *- المالك :* ${data.owner.login}\n`
      cap += `> *- لغة البرمجة :* ${data.language}\n`
      cap += `> *- إجمالي النجوم :* ${Func.h2k(data.watchers)}\n`
      cap += `> *- إجمالي الفروك :* ${Func.h2k(data.forks)}\n`
      cap += `> *- تم إنشاؤه منذ :* ${Func.ago(data.created_at)}\n`
      cap += `> *- آخر تحديث :* ${Func.ago(data.updated_at)}\n`
      cap += `\n> ${data.description}`
     
     m.reply({
       document: {
          url: api + "/zipball",
      },
      caption: cap,
      fileName: repo + ".zip",
      mimetype: "application/zip"
    })
  }
}