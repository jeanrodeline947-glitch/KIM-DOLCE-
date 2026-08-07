module.exports = {
    name: "hidetag",

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;

        const metadata = await sock.groupMetadata(jid);

        const mentions = metadata.participants.map(p => p.id);

        const text = args.join(" ") || "📢 Message de l'admin";

        await sock.sendMessage(jid, {
            text,
            mentions
        });

    }
};
