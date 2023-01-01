
const { delay, extractMessageContent } = require("@adiwajshing/baileys")
const { isUrl, fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "sticker",
    alias: ["s","sticker"],
    use: "<Respuesta>",
    desc: "Convierte imágenes, gif animados y videos a sticker.",
    type: "Stickers",
    example: "\nArchivo a sticker:\n*%prefix%command <Respuesta multimedia>*\n\nFoto de perfil a sticker:\n*%prefix%command @tag*\n\nLink a sticker:\n*%prefix%command https://telegra.ph/file/d7628ed80228711f4a95b.jpg*\n\nTexto a sticker:\n*%prefix%command Hola mundo*",
    start: async(killua, m, { command, prefix, text, quoted, mime }) => {  
        if (/image|video|sticker/.test(mime)) {
            try {
                
                let download = await quoted.download()
                await killua.sendFile(m.from, download, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })

            } catch (e) {
                m.reply(`*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*`)
            }

        } else if (quoted.mentions[0]) {
            try {

                let url = await killua.profilePictureUrl(quoted.mentions[0], "image")
                await killua.sendFile(m.from, url, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
            
            } catch (e) {
                m.reply(`*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*`)
            }

        } else if (isUrl(text)) {
            try {
            
                await killua.sendFile(m.from, isUrl(text)[0], "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })

            } catch (e) {
                m.reply(`*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*`)
            }
        } else if (text) {
            try {

                await killua.sendFile(m.from, global.apilol("lol", "/ttp3", { text: text }, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })

            } catch (e) {
                m.reply(`*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*`)
            }
        } else {
            return m.reply(`Debes responder o comentar un archivo multimedia con el comando: *${prefix + command}*`, m.from, { quoted: m })
        }
    }
}