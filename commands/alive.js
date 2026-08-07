module.exports = {
    name: "alive",

    async execute(sock, msg) {

        await sock.sendMessage(msg.key.remoteJid, {
            text: "✅ KIM DOLCE is Alive!\n🤖 Bot Connected Successfully."
        });

    }
};
