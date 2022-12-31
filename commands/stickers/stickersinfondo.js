const { getRandom, isUrl } = require("../../lib/Function")
const request = require('request')
const fs = require('fs')

module.exports = {
    name: "stickersinfondo",
    alias: ["stsinfondo"],
    use: "<reply>",
    desc: "Convert Image To Sticker With No Background",
    type: "convert",
    example: `%prefix%command --image reply`,
    start: async(killua, m, { command, prefix, quoted, mime, text }) => {
        if (/image/.test(mime)) {
            let download = await killua.downloadAndSaveMediaMessage(quoted)
            file_name = getRandom('.png')
            file_name2 = getRandom('.webp')
            request({
                url: `https://api.lolhuman.xyz/api/removebg?apikey=4fda13ee5ed767eef2174d23`,
                method: 'POST',
                formData: {
                    "img": fs.createReadStream(download)
                },
                encoding: "binary"
            }, async function(error, response, body) {
                fs.unlinkSync(download)
                fs.writeFileSync(file_name, body, "binary")
                ffmpeg(`./${file_name}`)
                                .input(file_name)
                                .on('error', function(err) {
                                    console.log(err)
                                    fs.unlinkSync(file_name)
                                })
                                .on('end', function() {
                                    ini_buff = fs.readFileSync(file_name2)
                                    killua.sendFile(m.from, ini_buff, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                                    fs.unlinkSync(file_name2)
                                })
                                .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                                .toFormat('webp')
                                .save(file_name2)
                
            })
        } else if (isUrl(text)) {
            killua.sendFile(m.from, global.apilol("lol", "/removebg", { img: isUrl(text)[0] }, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
        }   else {
            return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
        }
    }
}