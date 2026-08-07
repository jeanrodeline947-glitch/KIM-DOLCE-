const fs = require("fs");

module.exports = {
  name: "unwarn",

  async execute(sock, msg) {

    const jid = msg.key.remoteJid;

    if (!msg.message.extendedTextMessage?.contextInfo?.participant) {
      return sock.sendMessage(jid, {
        text: "❌ Reponn mesaj moun nan."
      });
    }

    const user = msg.message.extendedTextMessage.contextInfo.participant;

    let db = {};
    if (fs.existsSync("./database/warns.json")) {
      db = JSON.parse(fs.readFileSync("./database/warns.json"));
    }

    if (db[jid] && db[jid][user]) {
      delete db[jid][user];
      fs.writeFileSync("./database/warns.json", JSON.stringify(db, null, 2));
    }

    await sock.sendMessage(jid, {
      text: "✅ Avètisman yo efase."
    });
  }
};
