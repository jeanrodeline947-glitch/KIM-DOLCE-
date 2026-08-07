const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const P = require("pino");

async function startKimDolce() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: P({ level: "silent" }),
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", ({ connection }) => {
        if (connection === "open") {
            console.log("🤖 KIM DOLCE Connected!");
        }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const body =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        if (body === ".ping") {
            await sock.sendMessage(msg.key.remoteJid, {
                text: "🏓 Pong! KIM DOLCE Online ✅"
            });
        }

        if (body === ".menu") {
            await sock.sendMessage(msg.key.remoteJid, {
                text:
`🤖 KIM DOLCE

📂 Group Menu
📂 Admin Menu
📂 Download Menu
📂 AI Menu
📂 Fun Menu
📂 Owner Menu`
            });
        }
    });
}

startKimDolce();
