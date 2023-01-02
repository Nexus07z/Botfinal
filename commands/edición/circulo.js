const { isUrl } = require("../../lib/Function")
let { TelegraPh } = require('../../lib/Uploader')

module.exports = {
    name: "circulo",
    alias: ["circular"],
    use: "<Respuesta>",
    desc: "Recorta de manera circular una imagen.",
    type: "Edición de fotos",
    example: `\n*%prefix%command <Respuesta multimedia>*\n\n*%prefix%command https://telegra.ph/file/d7628ed80228711f4a95b.jpg*`,
    start: async(killua, m, { command, prefix, quoted, mime, text }) => {

        if (/image/.test(mime)) {
            try {
                
                let cargador = await killua.downloadAndSaveMediaMessage(quoted)
                let link = await TelegraPh(cargador)
                await killua.sendFile(m.from, global.apilol("lol", "/editor/roundimage", { img: link }, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })

            } catch (e) {
                m.reply(`*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*`)
            }

        } else if (isUrl(text)) {
            try {

                await killua.sendFile(m.from, global.apilol("lol", "/editor/roundimage", { img: isUrl(text)[0] }, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
            
            } catch (e) {
                m.reply(`*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*`)
            }

        }   else {
                let respuestacomando = `Debes responder o comentar una imagen con el comando: *${prefix + command}*`
                return m.reply(`${respuestacomando}`)
        }
    }
}