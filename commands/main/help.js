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
            
            killua.sendMessage(m.from, { text: teks }, { quoted: m })
        }
    },
    noLimit: true,
}
