module.exports = {
    name: "runtime",

    async execute(sock, msg) {

        const uptime = process.uptime();

        const h = Math.floor(uptime / 3600);
        const m = Math.floor((uptime % 3600) / 60);
        const s = Math.floor(uptime % 60);

        await sock.sendMessage(msg.key.remoteJid, {
            text: `⏱️ Runtime\n\n${h}h ${m}m ${s}s`
        });

    }
};
