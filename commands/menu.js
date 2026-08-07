module.exports = {
  name: "menu",
  alias: ["help"],
  category: "main",

  async execute(sock, msg) {
    const text = `
╭━━〔 🤖 KIM DOLCE 〕━━⬣
┃ 👑 Owner : KIM DOLCE
┃ ⚡ Version : 1.0.0
┃ 🟢 Status : Online
┃ 📌 Prefix : .
╰━━━━━━━━━━━━━━⬣

📂 MAIN MENU
• .menu
• .ping
• .owner
• .botinfo

👥 GROUP MENU
• .tagall
• .kick
• .promote
• .demote
• .hidetag

🛡️ SECURITY
• .antilink
• .antispam
• .antibot
• .antidelete

🤖 AI MENU
• .ai
• .chat

📥 DOWNLOAD
• .play
• .ytmp3
• .ytmp4

🎨 TOOLS
• .sticker
• .toimg
• .qr

👑 Powered by KIM DOLCE
`;

    await sock.sendMessage(msg.key.remoteJid, {
      text,
      contextInfo: {
        externalAdReply: {
          title: "KIM DOLCE",
          body: "Official WhatsApp Bot",
          thumbnailUrl: "https://i.imgur.com/4M34hi2.jpeg",
          sourceUrl: "https://github.com/",
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
  }
};
