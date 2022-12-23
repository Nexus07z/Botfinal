module.exports = {
    name: "tstickp",
    alias: ["ttpp"],
    use: "[texto|color|colorfondo]",
    desc: "Convierte texto con colores personalizados en un sticker.",
    type: "Stickers",
    example: "\n*%prefix%command Hola mundo|white|black*\n\n*%prefix%command Puedo escribir lo que sea.|black|blue*",
    start: async(killua, m, { command, prefix, text }) => {  
        
        let respuestacomando = `Falta agregar texto con los colores dejando un espacio al lado del siguiente comando: *${prefix + command}*\n\n*Por ejemplo:*\n\n*${prefix + command} Hola mundo|white|black*`
        if (!text) return m.reply(`${respuestacomando}`)
        if (!text.includes('|')) return m.reply(`${respuestacomando}`)
        try {
            
            let [a, b, c] = text.split`|`
            await killua.sendFile(m.from, global.api("zenz", "/creator/ttp", { text: a,  colour: b,  bgcolour: c }, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })

        } catch (e) {
            m.reply(`*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*`)
        }   
    }
}