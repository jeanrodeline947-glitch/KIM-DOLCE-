const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const P = require("pino");
const fs = require("fs");

// Charger toutes les commandes
const commands = new Map();

if (fs.existsSync("./commands")) {
    const files = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));

    for (const file of files) {
        const command = require("./commands/" + file);
        commands.set(command.name, command);
        console.log("✅ Commande chargée :", command.name);
    }
}

async function startKimDolce() {

    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: true,
        logger: P({ level: "silent" })
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {

        if (connection === "open") {
            console.log("🤖 KIM DOLCE connecté !");
        }

        if (connection === "close") {

            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !==
                DisconnectReason.loggedOut;

            if (shouldReconnect) {
                startKimDolce();
            }

        }

    });

    sock.ev.on("messages.upsert", async ({ messages }) => {

        const msg = messages[0];

        if (!msg.message) return;

        const body =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        const prefix = ".";

        if (!body.startsWith(prefix)) return;

        const args = body.slice(prefix.length).trim().split(/ +/);

        const cmd = args.shift().toLowerCase();

        if (commands.has(cmd)) {

            try {

                await commands.get(cmd).execute(sock, msg, args);

            } catch (err) {

                console.log(err);

                await sock.sendMessage(msg.key.remoteJid, {
                    text: "❌ Une erreur est survenue."
                });

            }

        }

    });

}

startKimDolce();
