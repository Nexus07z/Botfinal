module.exports = {
    name: "tstickp",
    alias: ["ttpp"],
    use: "[texto|color|colorfondo]",
    desc: "Convierte texto con colores personalizados en un sticker.",
    type: "Stickers",
    example: "\n*%prefix%command Hola mundo|blanco|negro*\n\n*%prefix%command Puedo escribir lo que sea.|rojo|turquesa*",
    start: async(killua, m, { command, prefix, text }) => {  
        
        let respuestacomando = `Falta agregar texto con los colores dejando un espacio al lado del siguiente comando: *${prefix + command}*\n\n*Por ejemplo:*\n\n*${prefix + command} Hola mundo|blanco|negro*`
        if (!text) return m.reply(`${respuestacomando}`)
        if (!text.includes('|')) return m.reply(`${respuestacomando}`)
        
        try {
            
            let [a, b, c] = text.split`|`
            var mapObj = {
                rojo:"red",
                anaranjado:"orange",
                naranja:"orange",
                amarillo:"yellow",
                verdelima:"lime",
                verde:"green",
                morado:"purple",
                negro:"black",
                plomo:"gray",
                blanco:"white",
                índigo:"indigo",
                indigo:"indigo",
                añil:"indigo",
                rosado:"pink",
                rosa:"pink",
                azulclaro:"lightblue",
                azuloscuro:"darkblue",
                azullavanda:"lavender",
                azul:"blue",
                celeste:"skyblue",
                aguamarina:"aquamarine",
                beige:"beige",
                carmesí:"crimson",
                carmesi:"crimson",
                fucsia:"fuchsia",
                dorado:"gold",
                marfil:"ivory",
                caqui:"khaki",
                kaki:"khaki",
                magenta:"magenta",
                ciruela:"plum",
                salmón:"salmon",
                salmon:"salmon",
                marrón:"sienna",
                marron:"sienna",
                café:"sienna",
                cafe:"sienna",
                plata:"silver",
                habano:"tan",
                turquesa:"turquoise",
                violeta:"violet"
             
            }
            b = b.replace(/rojo|anaranjado|naranja|amarillo|verdelima|verde|morado|negro|plomo|blanco|índigo|indigo|añil|rosado|rosa|azulclaro|azuloscuro|azullavanda|azul|celeste|aguamarina|beige|carmesí|carmesi|fucsia|dorado|marfil|caqui|kaki|magenta|ciruela|salmón|salmon|marrón|marron|café|cafe|plata|habano|turquesa|violeta/g, function(matched){
                return mapObj[matched];
            })
            c = c.replace(/rojo|anaranjado|naranja|amarillo|verdelima|verde|morado|negro|plomo|blanco|índigo|indigo|añil|rosado|rosa|azulclaro|azuloscuro|azullavanda|azul|celeste|aguamarina|beige|carmesí|carmesi|fucsia|dorado|marfil|caqui|kaki|magenta|ciruela|salmón|salmon|marrón|marron|café|cafe|plata|habano|turquesa|violeta/g, function(matched){
                return mapObj[matched];
            })
            await killua.sendFile(m.from, global.api("zenz", "/creator/ttp", { text: a,  colour: b,  bgcolour: c }, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })

        } catch (e) {
            m.reply(`*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*`)
        }   
    }
}