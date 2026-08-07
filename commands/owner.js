module.exports = {
    name: "owner",

    async execute(sock, msg) {

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`👑 OWNER INFORMATION

🤖 Bot : KIM DOLCE
👤 Developer : KIM DOLCE
📌 Version : 1.0.0

Merci d'utiliser KIM DOLCE ❤️`
        });

    }
};
