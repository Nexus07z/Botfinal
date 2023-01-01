const { getRandom, isUrl } = require("../../lib/Function")
let { TelegraPh } = require('../../lib/Uploader')
const request = require('request')
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg');
const { removeBackgroundFromImageBase64 } = require('remove.bg');

module.exports = {
    name: "stickersinfondo2",
    alias: ["stsinfondo2"],
    use: "<Respuesta>",
    desc: "Convertir una imagen en un sticker sin fondo.",
    type: "Stickers",
    example: `\n*%prefix%command <Respuesta multimedia>*\n\n*%prefix%command <Respuesta multimedia>*`,
    start: async(killua, m, { command, prefix, quoted, mime, text }) => {
        
        if (/image/.test(mime)) {
            try {
                
                let cargador = await killua.downloadAndSaveMediaMessage(quoted)
                keyrmbg = 'Dg1RTQmpTa7S9QbzDUWex1SJ'
                ranp = getRandom('.png')
                await removeBackgroundFromImageFile({ path: cargador, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp })
                    fs.unlinkSync(cargador)
                    let buffer = Buffer.from(res.base64img, 'base64')
                    naze.sendImageAsSticker(m.chat, buffer, m, { packname: global.packname, author: global.author })
                    fs.unlinkSync(buffer)
                
                

            } catch (e) {
                m.reply(`*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*`)
            }

        } else if (isUrl(text)) {
            try {

                await killua.sendFile(m.from, global.apilol("lol", "/removebg", { img: isUrl(text)[0] }, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
            
            } catch (e) {
                m.reply(`*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*`)
            }

        }   else {
                let respuestacomando = `Debes responder o comentar una imagen con el comando: *${prefix + command}*`
                return m.reply(`${respuestacomando}`)
        }
    }
}