import moment from 'moment-timezone';

let handler = async (m, { conn, args }) => {
  let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  let user = global.db.data.users[userId];

  let name = conn.getName(userId);
  let cumpleanos = user.birth || 'No especificado';
  let genero = user.genre || 'No especificado';
  let pareja = user.marry || 'No especificado';
  let exp = user.exp || 0;
  let nivel = user.level || 0;
  let coins = user.coin || 0;

  let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg');

  let profileText = `
ᥫ᭡ *Perfil* @${userId.split('@')[0]}

✧ *Cumpleaños* » ${cumpleanos}
✧ *Género* » ${genero}
ᰔᩚ *Casado con* » ${pareja}

⛁ *${moneda}* » ${coins}
  `.trim();

  await conn.sendMessage(m.chat, { 
    text: profileText,
    contextInfo: {
      mentionedJid: [userId],
      externalAdReply: {
        title: '✧ Perfil de Usuario ✧',
        body: botname,
        thumbnailUrl: perfil,
        sourceUrl: enlace,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
};

handler.help = ['profile'];
handler.tags = ['rg'];
handler.command = ['profile'];

export default handler;