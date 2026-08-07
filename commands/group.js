module.exports = {
  name: "group",

  async execute(sock, msg, args) {

    const jid = msg.key.remoteJid;

    if (args[0] === "open") {
      await sock.groupSettingUpdate(jid, "not_announcement");
      return sock.sendMessage(jid, {
        text: "✅ Group la louvri."
      });
    }

    if (args[0] === "close") {
      await sock.groupSettingUpdate(jid, "announcement");
      return sock.sendMessage(jid, {
        text: "🔒 Group la fèmen."
      });
    }

    await sock.sendMessage(jid, {
      text: "Itilizasyon:\n.group open\n.group close"
    });

  }
};
