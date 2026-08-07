module.exports = {
  name: "mute",

  async execute(sock, msg) {

    const jid = msg.key.remoteJid;

    await sock.groupSettingUpdate(jid, "announcement");

    await sock.sendMessage(jid, {
      text: "🔇 Gwoup la mete sou mute.\nSe admin sèlman ki ka voye mesaj."
    });

  }
};
