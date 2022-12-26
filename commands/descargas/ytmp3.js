const { fetchUrl, isUrl } = require("../../lib/Function")

module.exports = {
    name: "ytmp3",
    alias: ["ytaudio"],
    use: "[Link]",
    desc: "Descargar un audio de https://youtube.com",
    type: "descargas",
    example: "\n*%prefix%command https://youtu.be/QQPgk_MkK4k*\n\n*%prefix%command https://www.youtube.com/watch?v=QQPgk_MkK4k*",
    start: async(killua, m, { command, prefix, text }) => {
        
        let respuestacomando = `Falta agregar el link dejando un espacio al lado del siguiente comando: *${prefix + command}*\n\n*Por ejemplo:*\n\n*${prefix + command} https://youtu.be/QQPgk_MkK4k*`
        if (!text) return m.reply(`${respuestacomando}`)
        if (!isUrl(text)) return m.reply(`${respuestacomando}`)
        if (!text.includes('youtu.be') && !text.includes('youtube')) return m.reply(`*El link tiene que ser de youtube.*`)

        try {

            let fetch = await fetchUrl(global.apilol("lol", "/ytaudio", { url: isUrl(text)[0] }, "apikey"))
            let [horas, minutos, segundos] = fetch.result.duration.split`:`
            let mediatime = parseFloat(horas*3600) + parseFloat(minutos*60) + parseFloat(segundos)
            if (mediatime > 600) {
                m.reply(`*La duración máxima permitida es de 10 minutos.*`)
            } else {
                await killua.sendFile(m.from, fetch.result.link.link, "", m)  
            }
            
        } catch (e) {
            m.reply(`*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*`)
        }  
    }
}