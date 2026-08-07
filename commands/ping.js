module.exports = {
    name: "ping",

    async execute(sock, msg) {

        const start = Date.now();

        await sock.sendMessage(msg.key.remoteJid, {
            text: "🏓 Pong!\n\n🤖 KIM DOLCE Online\n⚡ Latence : " + (Date.now() - start) + " ms"
        });

    }
};
