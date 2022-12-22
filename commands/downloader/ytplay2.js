const yts = require('yt-search')
module.exports = {
    name: "ytplay2",
    alias: ["play2"],
    use: "<query>",
    desc: "Download Media From https://youtube.com",
    type: "downloader",
    example: "%prefix%command <url>ss",
    start: async(killua, m, { text }) => {
        let search = await yts(text)
        let segmento = search.videos[Math.floor(Math.random() * search.videos.length)]
        
        let buttons = [
            {buttonId: `${prefix}ytmp3 https://youtu.be/${segmento.videoId}`, buttonText: {displayText: '♫ Audio'}, type: 1},
            {buttonId: `${prefix}ytmp4 https://youtu.be/${segmento.videoId}`, buttonText: {displayText: '► Video'}, type: 1}
        ]

        let caption = `*Youtube*\n\n`
        caption += `*Titulo:* ${segmento.title}\n\n`
        caption += `*ID Youtube:* ${segmento.videoId}\n\n`
        caption += `*Duración:* ${segmento.timestamp}\n\n`
        caption += `*Link:* https://youtu.be/${segmento.videoId}\n`

        let buttonMessage = {
            image: { url: segmento.thumbnail },
            caption: caption,
            footer: config.footer,
            buttons: buttons,
            headerType: 4
        }

        killua.sendMessage(m.from, buttonMessage, { quoted: m })
    },
    isQuery: true
}