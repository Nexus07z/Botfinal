
const { delay, extractMessageContent } = require("@adiwajshing/baileys")
const { isUrl, fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "textocolor",
    alias: ["attp","textcolor"],
    use: "[texto]",
    desc: "Convierte imágenes, gif animados y videos a sticker.",
    type: "Stickers",
    example: "\nArchivo a sticker: %prefix%command <Archivo Multimedia Comentado>\nFoto de perfil: %prefix%command @tag\nLink: %prefix%command [Link del archivo]",
    start: async(killua, m, { command, prefix, text, quoted, mime }) => {  
        
        let respuestacomando = `*${prefix + command} Texto*`
        if (!text) return m.reply(`${respuestacomando}`)

        try {       
                    //await naze.sendMedia(m.chat, `https://xteam.xyz/attp?file&text=${text}`, '', '', m, {asSticker: true})
                    await m.reply(`xd`)
        } catch (e) {
        m.reply(`error`)
        }
        
        
    }
}