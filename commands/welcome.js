const fs = require("fs");

module.exports = {
  name: "welcome",

  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;

    let db = {};
    if (fs.existsSync("./database/welcome.json")) {
      db = JSON.parse(fs.readFileSync("./database/welcome.json"));
    }

    if (args[0] === "on") {
      db[jid] = true;
      fs.writeFileSync("./database/welcome.json", JSON.stringify(db, null, 2));

      return sock.sendMessage(jid, {
        text: "✅ Welcome aktivé."
      });
    }

    if (args[0] === "off") {
      delete db[jid];
      fs.writeFileSync("./database/welcome.json", JSON.stringify(db, null, 2));

      return sock.sendMessage(jid, {
        text: "❌ Welcome dezaktive."
      });
    }

    return sock.sendMessage(jid, {
      text: "Itilizasyon:\n.welcome on\n.welcome off"
    });
  }
};
