const { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "ytplay",
    alias: ["play"],
    use: "[Texto]",
    desc: "Obtener archivos multimedia de https://youtube.com",
    type: "descargas",
    example: "\n*%prefix%command Green day Holiday Letra*",
    start: async(killua, m, { command, prefix, text }) => {
        
        let respuestacomando = `Falta agregar el nombre de la música dejando un espacio al lado del siguiente comando: *${prefix + command}*\n\n*Por ejemplo:*\n\n*${prefix + command} Green day Holiday Letra*`
        if (!text) return  m.reply(respuestacomando)

        try {
            
            let fetch = await fetchUrl(global.apilol("lol", "/ytplay", { query: text }, "apikey"))
            let caption = `*Youtube*\n\n`
            let i = fetch.result
            caption += `*Título:* ${i.title}\n\n`
            caption += `*ID Youtube:* ${i.id}\n\n`
            caption += `*Duración:* ${i.duration}\n\n`
            caption += `*Link:* https://youtu.be/${i.id}\n`
            
            let buttons = [
                {buttonId: `${prefix}ytmp3 https://youtu.be/${i.id}`, buttonText: { displayText: '♫ Audio'}, type: 1 },
                {buttonId: `${prefix}ytmp4 https://youtu.be/${i.id}`, buttonText: { displayText: '► Video'}, type: 1 }
            ]

            let buttonMessage = {
                image: { url: i.thumbnail },
                caption: caption,
                footer: config.footer,
                buttons: buttons,
                headerType: 4
            }

            killua.sendMessage(m.from, buttonMessage, { quoted: m })

        } catch (e) {
            m.reply(`*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*`)
        }  
    },
}