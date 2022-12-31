const { getRandom, isUrl } = require("../../lib/Function")
let { TelegraPh } = require('../../lib/Uploader')
const request = require('request')
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')

module.exports = {
    name: "stickersinfondo",
    alias: ["stsinfondo"],
    use: "<reply>",
    desc: "Convert Image To Sticker With No Background",
    type: "convert",
    example: `%prefix%command --image reply`,
    start: async(killua, m, { command, prefix, quoted, mime, text }) => {
        if (/image/.test(mime)) {
            
            let cargador = await killua.downloadAndSaveMediaMessage(quoted)
            let link = await TelegraPh(cargador)
            await killua.sendFile(m.from, global.apilol("lol", "/removebg", { img: link }, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
    

        } else if (isUrl(text)) {
            killua.sendFile(m.from, global.apilol("lol", "/removebg", { img: isUrl(text)[0] }, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
        }   else {
            return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
        }
    }
}