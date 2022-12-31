const { getRandom, isUrl } = require("../../lib/Function")
const request = require('request')
const fs = require('fs')

module.exports = {
    name: "stickersinfondo1",
    alias: ["stsinfondo1"],
    use: "<reply>",
    desc: "Convert Image To Sticker With No Background",
    type: "convert",
    example: `%prefix%command --image reply`,
    start: async(killua, m, { command, prefix, quoted, mime, text }) => {
        if (/image/.test(mime)) {
            let download = await killua.downloadAndSaveMediaMessage(quoted)
            file_name = getRandom('.png')
            request({
                url: global.apilol("lol", "/removebg", {}, "apikey"),
                method: 'POST',
                formData: {
                    "img": fs.createReadStream(download)
                },
                encoding: "binary"
            }, async function(error, response, body) {
                fs.unlinkSync(download)
                fs.writeFileSync(file_name, body, "binary")
                ini_buff = fs.readFileSync(file_name)
                await killua.sendFile(m.from, ini_buff, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] }).then(() => {
                    fs.unlinkSync(file_name)
                })
            })
        } else if (isUrl(text)) {
            killua.sendFile(m.from, global.apilol("lol", "/removebg", { img: isUrl(text)[0] }, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
        }   else {
            return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
        }
    }
}