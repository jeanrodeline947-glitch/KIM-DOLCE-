const fs = require("fs");

module.exports = {
  name: "warn",

  async execute(sock, msg) {
    const jid = msg.key.remoteJid;

    if (!msg.message.extendedTextMessage?.contextInfo?.participant) {
      return sock.sendMessage(jid, {
        text: "❌ Reponn mesaj moun ou vle avèti a."
      });
    }

    const user = msg.message.extendedTextMessage.contextInfo.participant;

    let db = {};
    if (fs.existsSync("./database/warns.json")) {
      db = JSON.parse(fs.readFileSync("./database/warns.json"));
    }

    if (!db[jid]) db[jid] = {};
    if (!db[jid][user]) db[jid][user] = 0;

    db[jid][user]++;

    fs.writeFileSync("./database/warns.json", JSON.stringify(db, null, 2));

    await sock.sendMessage(jid, {
      text: `⚠️ @${user.split("@")[0]} gen ${db[jid][user]}/3 avètisman.`,
      mentions: [user]
    });

    if (db[jid][user] >= 3) {
      await sock.groupParticipantsUpdate(jid, [user], "remove");

      delete db[jid][user];
      fs.writeFileSync("./database/warns.json", JSON.stringify(db, null, 2));

      await sock.sendMessage(jid, {
        text: "🚫 Itilizatè a retire apre 3 avètisman."
      });
    }
  }
};
