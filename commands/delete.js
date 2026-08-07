module.exports = {
  name: "delete",

  async execute(sock, msg) {

    if (!msg.message.extendedTextMessage?.contextInfo?.stanzaId) {
      return sock.sendMessage(msg.key.remoteJid, {
        text: "❌ Reponn mesaj bot la pou efase li."
      });
    }

    await sock.sendMessage(msg.key.remoteJid, {
      delete: {
        remoteJid: msg.key.remoteJid,
        fromMe: true,
        id: msg.message.extendedTextMessage.contextInfo.stanzaId
      }
    });

  }
};
