const fs = require("fs");

module.exports = {
  name: "antilink",

  async execute(sock, msg, args) {

    const jid = msg.key.remoteJid;
    const db = JSON.parse(fs.readFileSync("./database/database.json"));

    if (!db.antilink) db.antilink = {};

    if (args[0] === "on") {
      db.antilink[jid] = true;
      fs.writeFileSync("./database/database.json", JSON.stringify(db, null, 2));

      return sock.sendMessage(jid, {
        text: "🛡️ Anti-Link ACTIVÉ."
      });
    }

    if (args[0] === "off") {
      delete db.antilink[jid];
      fs.writeFileSync("./database/database.json", JSON.stringify(db, null, 2));

      return sock.sendMessage(jid, {
        text: "❌ Anti-Link DÉSACTIVÉ."
      });
    }

    return sock.sendMessage(jid, {
      text: "Utilisation :\n.antilink on\n.antilink off"
    });

  }
};
