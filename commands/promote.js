module.exports = {
  name: "promote",

  async execute(sock, msg) {

    const jid = msg.key.remoteJid;

    if (!msg.message.extendedTextMessage?.contextInfo?.participant) {
      return sock.sendMessage(jid, {
        text: "❌ Reponn mesaj moun ou vle fè admin."
      });
    }

    const user = msg.message.extendedTextMessage.contextInfo.participant;

    await sock.groupParticipantsUpdate(
      jid,
      [user],
      "promote"
    );

    await sock.sendMessage(jid, {
      text: "👑 Moun nan vin admin."
    });

  }
};
