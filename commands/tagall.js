module.exports = {
  name: "tagall",

  async execute(sock, msg) {

    const jid = msg.key.remoteJid;

    const metadata = await sock.groupMetadata(jid);

    let text = "📢 *TAG ALL MEMBERS*\n\n";
    let mentions = [];

    for (let member of metadata.participants) {
      mentions.push(member.id);
      text += `➤ @${member.id.split("@")[0]}\n`;
    }

    await sock.sendMessage(jid, {
      text,
      mentions
    });

  }
};
