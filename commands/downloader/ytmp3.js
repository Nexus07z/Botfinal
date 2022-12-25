const { fetchUrl, isUrl } = require("../../lib/Function")

module.exports = {
    name: "ytmp3",
    alias: ["ytaudio"],
    use: "<url>",
    desc: "Download Media From https://youtube.com",
    type: "downloader",
    example: "%prefix%command <url>",
    start: async(killua, m, { text }) => {
        let fetch = await fetchUrl(global.apilol("lol", "/ytaudio", { url: isUrl(text)[0] }, "apikey"))
        
        killua.sendFile(m.from, fetch.result.link.link, "", m)
        killua.sendMessage(m.from, { audio: fetch.result.link.link, mimetype: 'audio/mp4' , fileName: `${fetch.result.title}.mp3` }, { quoted: m })
    },
    isQuery: true
}