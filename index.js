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

if (fs.existsSync("./commandes")) {
    const files = fs.readdirSync("./commandes").filter(f => f.endsWith(".js"));

    for (const file of files) {
        const command = require("./commandes/" + file);

        if (command.name && typeof command.execute === "function") {
            commands.set(command.name.toLowerCase(), command);
            console.log("✅ Commande chargée :", command.name);
        }
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
                
