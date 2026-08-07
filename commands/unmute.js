module.exports = {
  name: "unmute",

  async execute(sock, msg) {

    const jid = msg.key.remoteJid;

    await sock.groupSettingUpdate(jid, "not_announcement");

    await sock.sendMessage(jid, {
      text: "🔊 Gwoup la ouvè ankò.\nTout manm yo ka voye mesaj."
    });

  }
};
