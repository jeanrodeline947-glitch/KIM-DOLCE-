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
