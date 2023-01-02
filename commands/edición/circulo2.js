const { getRandom } = require("../../lib/Function")
const request = require('request')
const fs = require('fs')

module.exports = {
    name: "circulo2",
    alias: ["circular2"],
    use: "<Respuesta>",
    desc: "Recorta de manera circular una imagen.",
    type: "Edición de fotos",
    example: `\n*%prefix%command <Respuesta multimedia>*`,
    start: async(killua, m, { command, prefix, quoted, mime }) => {

        if (/image/.test(mime)) {
            try {
                let download = await killua.downloadAndSaveMediaMessage(quoted)
                file_name = getRandom('jpg')
                request({
                    url: `https://api.lolhuman.xyz/api/editor/roundimage?apikey=4fda13ee5ed767eef2174d23`,
                    method: 'POST',
                    formData: {
                        "img": fs.createReadStream(download)
                    },
                    encoding: "binary"
                }, async function(error, response, body) {
                    fs.unlinkSync(download)
                    fs.writeFileSync(file_name, body, "binary")
                    ini_buff = fs.readFileSync(file_name)
                    await killua.sendFile(m.from, ini_buff, "", m).then(() => {
                        fs.unlinkSync(file_name)
                    })
                })
            } catch (e) {
                m.reply(`*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*`)
            }
        } else {
            return m.reply(`Debes responder o comentar una imagen con el comando: *${prefix + command}*`, m.from, { quoted: m })
        }
    }
}