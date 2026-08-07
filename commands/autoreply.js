const fs = require("fs");

module.exports = {
    name: "autoreply",

    async execute(sock, msg, args) {

        const jid = msg.key.remoteJid;

        let db = {};

        if (fs.existsSync("./database/autoreply.json")) {
            db = JSON.parse(fs.readFileSync("./database/autoreply.json"));
        }

        if (args[0] === "on") {

            db[jid] = true;

            fs.writeFileSync("./database/autoreply.json", JSON.stringify(db, null, 2));

            return sock.sendMessage(jid,{
                text:"🤖 Auto Reply ACTIVÉ."
            });

        }

        if (args[0] === "off") {

            delete db[jid];

            fs.writeFileSync("./database/autoreply.json", JSON.stringify(db, null, 2));

            return sock.sendMessage(jid,{
                text:"❌ Auto Reply DÉSACTIVÉ."
            });

        }

        sock.sendMessage(jid,{
            text:"Utilisation:\n.autoreply on\n.autoreply off"
        });

    }
};
