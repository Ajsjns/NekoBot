const config = require("../settings.js");
const Func = require("../lib/function.js");
const serialize = require("../lib/serialize.js");
const Uploader = require("../lib/uploader.js");
const pkg = require("baileys");
const moment = require("moment-timezone");
const cron = require("node-cron");

module.exports = async (m, sock, store) => {
        console.log(JSON.stringify(m, null, 2))
        require("../lib/logger.js")(m);
        if (m.key.jid === "status@broadcast") {
            await sock.readMessages([m.key]);
            await sock.sendMessage(
                m.key.jid,
                { react: { text: "📸", key: m.key } },
                { statusJidList: Object.keys(store.contact) }
            );
            console.log(chalk.green.bold("– Reading WhatsApp status from: " + m.pushName));
            return; 
        }
        await db.main(m);
        if (m.isBot) return;     
        if (db.list().settings.self && !m.isOwner) return;
        if (m.isGroup && db.list().group[m.cht]?.mute && !m.isOwner) return
        if (Object.keys(store.groupMetadata).length === 0) {
            store.groupMetadata = await sock.groupFetchAllParticipating();
        }
        const isPrems = db.list().user[m.sender].premium.status
        const isBanned = db.list().user[m.sender].banned.status
        const isAdmin = m.isAdmin
        const botAdmin = m.isBotAdmin
       cron.schedule('* * * * *', () => {
         let user = Object.keys(db.list().user);
         let time = moment.tz(config.tz).format("HH:mm");
         if (db.list().settings.resetlimit == time) {
         for (let i of user) {
              db.list().user[i].limit = 100
             }
          }
        })         
        for (let name in pg.plugins) {
           const plugin = pg.plugins[name];
           if (!plugin) return;
           if (typeof plugin.events === "function") {
           if (plugin.events.call(sock, m, {
                sock,
                Func,
                config,
                Uploader,
                store,
                isAdmin,
                botAdmin,
                isPrems,
                isBanned
             })) continue;
           }
            const Scraper = await scraper.list();
            const cmd = m.command.toLowerCase() === plugin.command || plugin?.alias?.includes(m.command.toLowerCase());
          try {
            if (cmd) {
                let text = m.text;
                if (plugin.settings) {
                    if (plugin.settings.owner && !m.isOwner) {
                        return m.reply("> هذه الميزة مخصصة للمالك فقط");
                    }
                    if (plugin.settings.group && !m.isGroup) {
                        return m.reply("> هذه الميزة تعمل في المجموعات فقط");
                    }
                    if (plugin.settings.admin && !isAdmin) {
                        return m.reply("> هذه الميزة تتطلب صلاحيات المدير");
                    }
                    if (plugin.settings.botAdmin && !botAdmin) {
                        return m.reply("> يجب أن يكون البوت مديرًا لاستخدام هذه الميزة");
                    }    
                }
                await plugin.run(m, {
                    sock,
                    config,
                    text,
                    plugins: Object.values(pg.plugins).filter((a) => a.alias),
                    Func,
                    Scraper,
                    Uploader,
                    store,
                    isAdmin,
                    botAdmin,
                    isPrems,
                    isBanned
                }).then(async(a) => {
             if (plugin?.settings?.limit && !isPrems && !m.isOwner) {
                 db.list().user[m.sender].limit -= 1
                 m.reply(`> لقد استخدمت ميزة محدودة\n> *- المتبقي من الحد :* ${db.list().user[m.sender].limit} ☘️\n> *- ملاحظة :* سيتم إعادة تعيين الحد الساعة 02:00 WIB`);
                }             
             });
           if (plugin.loading) m.react("🕐");
        }
    } catch (error) {
        if (error.name) {
          m.reply(Func.jsonFormat(error));
        } else {
         m.reply(Func.jsonFormat(error));
        }
    } finally {
       if (db.list().settings.online) {
         await sock.readMessages([m.key]);
       }
    }
  }
};