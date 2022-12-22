module.exports = {
    name: "menu",
    alias: ["help","?"],
    desc: "List all command",
    type: "main",
    start: async(killua, m, { commands, args, prefix, text, toUpper }) => {
        const { pushName, sender } = m
        if (args[0]) {
            let data = []
            let name = args[0].toLowerCase()
            let cmd = commands.get(name) || Array.from(commands.values()).find((v) => v.alias.includes(name))
            if (!cmd || cmd.type == "hide") return m.reply("No Command Found")
            else data.push(`*Comando:* ${prefix}${cmd.name.replace(/^\w/, c => c.toLowerCase())}`)
            if (cmd.alias) data.push(`*Alias:* ${cmd.alias.join(", ")}`)
            if (cmd.use) data.push(`*Uso:* ${cmd.use}`);
            if (cmd.desc) data.push(`*Descripción:* ${cmd.desc}\n`)
            if (cmd.example) data.push(`*Ejemplo:* \n${cmd.example.replace(/%prefix/gi, prefix).replace(/%command/gi, cmd.name).replace(/%text/gi, text)}`)
            return m.reply(`*Información de ${cmd.name.replace(/^\w/, c => c.toUpperCase())}*\n\n${data.join("\n")}`)
        } else {
            let teks = `Hola, *${pushName === undefined ? sender.split("@")[0] : pushName}*\n\nAquí está la lista de comandos.\n\n`

            for (let type of commands.type) {
                teks += `┌──⭓ *Menú de ${toUpper(type)}*\n`
                teks += `│\n`
                teks += `${commands.list[type].filter(v => v.type !== "hide").map((cmd) => `│⭔ ${prefix + cmd.name} ${cmd.use ? " " + cmd.use : ""}`).join("\n")}\n`
                teks += `│\n`
                teks += `└───────⭓\n\n`
            }

            teks += `Escribe el comando *${prefix}?* seguido del nombre de un comando para obtener información respecto a su uso.\n\n*Por ejemplo:*\n\n *${prefix}? sticker*`;
            
            let templateButtons = [
                {index: 1, urlButton: { displayText: "Source Code", url: "https://github.com/zhwzein/Killua-Zoldyck" }},
                {index: 2, urlButton: { displayText: "Main APIs", url: "http://zenzapis.xyz" }},
                {index: 3, quickReplyButton: {displayText: 'This is a reply, just like normal buttons!', id: 'id-like-buttons-message'}},
            ]

            let templateMessage = {
                image: { url: 'https://camo.githubusercontent.com/23f3195d91e7095ae37ef6a22475b9f1206f8334bc3e5ca61637f7d7e8cf962a/68747470733a2f2f692e70696e696d672e636f6d2f373336782f66662f38372f62372f66663837623730653963396465613464396361333263393533386138316333622e6a7067' },
                caption: teks,
                footer: config.footer,
                templateButtons: templateButtons
            }

            killua.sendMessage(m.from, { text: teks }, { quoted: m })
        }
    },
    noLimit: true,
}
