module.exports = {
  name: "kick",

  async execute(sock, msg) {

    const jid = msg.key.remoteJid;

    if (!msg.message.extendedTextMessage?.contextInfo?.participant) {
      return sock.sendMessage(jid, {
        text: "❌ Reponn yon mesaj pou retire manm nan."
      });
    }

    const user = msg.message.extendedTextMessage.contextInfo.participant;

    await sock.groupParticipantsUpdate(
      jid,
      [user],
      "remove"
    );

    await sock.sendMessage(jid, {
      text: "✅ Manm nan retire nan gwoup la."
    });

  }
};
