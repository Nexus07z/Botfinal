const { isUrl } = require("../../lib/Function")
let { TelegraPh } = require('../../lib/Uploader')

module.exports = {
    name: "img-filtro-lofi",
    alias: ["imgflofi"],
    use: "<Respuesta>",
    desc: "Convierte una imagen con filtro lofi.",
    type: "Edición de fotos",
    example: `\n*%prefix%command <Respuesta multimedia>*\n\n*%prefix%command https://telegra.ph/file/d7628ed80228711f4a95b.jpg*`,
    start: async(killua, m, { command, prefix, quoted, mime, text }) => {

        if (/image/.test(mime)) {
            try {
                
                let cargador = await killua.downloadAndSaveMediaMessage(quoted)
                let link = await TelegraPh(cargador)
                await killua.sendFile(m.from, global.apilol("lol", "/filter/lofi", { img: link }, "apikey"), "", m)

            } catch (e) {
                m.reply(`*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*`)
            }

        } else if (isUrl(text)) {
            try {

                await killua.sendFile(m.from, global.apilol("lol", "/filter/lofi", { img: isUrl(text)[0] }, "apikey"), "", m)
            
            } catch (e) {
                m.reply(`*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*`)
            }

        }   else {
                let respuestacomando = `Debes responder o comentar una imagen con el comando: *${prefix + command}*`
                return m.reply(`${respuestacomando}`)
        }
    }
}