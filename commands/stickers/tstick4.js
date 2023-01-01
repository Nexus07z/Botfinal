module.exports = {
    name: "tstick4",
    alias: ["ttp4"],
    use: "[Texto]",
    desc: "Convierte texto en un sticker.",
    type: "Stickers",
    example: "\n*%prefix%command Hola mundo*\n\n*%prefix%command Puedo escribir lo que sea.*",
    start: async(killua, m, { command, prefix, text }) => {  
        
        let respuestacomando = `Falta agregar texto dejando un espacio al lado del siguiente comando: *${prefix + command}*\n\n*Por ejemplo:*\n\n*${prefix + command} Hola mundo*`
        if (!text) return m.reply(`${respuestacomando}`)

        try {

            await killua.sendFile(m.from, global.apilol("lol", "/ttp4", { text: text }, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
            
        } catch (e) {
            m.reply(`*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*`)
        }   
    }
}