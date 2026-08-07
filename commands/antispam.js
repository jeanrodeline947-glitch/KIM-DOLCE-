const fs = require("fs");

module.exports = {
    name: "antispam",

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;

        let db = {};

        if (fs.existsSync("./database/antispam.json")) {
            db = JSON.parse(fs.readFileSync("./database/antispam.json"));
        }

        if (args[0] === "on") {
            db[jid] = true;
            fs.writeFileSync("./database/antispam.json", JSON.stringify(db, null, 2));

            return sock.sendMessage(jid, {
                text: "🛡️ Anti-Spam ACTIVÉ."
            });
        }

        if (args[0] === "off") {
            delete db[jid];
            fs.writeFileSync("./database/antispam.json", JSON.stringify(db, null, 2));

            return sock.sendMessage(jid, {
                text: "❌ Anti-Spam DÉSACTIVÉ."
            });
        }

        sock.sendMessage(jid, {
            text: "Utilisation :\n.antispam on\n.antispam off"
        });

    }
};
