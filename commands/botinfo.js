module.exports = {
    name: "botinfo",

    async execute(sock, msg) {

        const info = `
╭━━〔 🤖 KIM DOLCE 〕━━⬣
┃ 👑 Name : KIM DOLCE
┃ 🚀 Version : 1.0.0
┃ ⚡ Status : Online
┃ 💻 Language : JavaScript
┃ 📦 Library : Baileys
┃ 👤 Developer : KIM DOLCE
╰━━━━━━━━━━━━━━⬣

🔥 Official WhatsApp Bot
`;

        await sock.sendMessage(msg.key.remoteJid, {
            text: info
        });

    }
};
