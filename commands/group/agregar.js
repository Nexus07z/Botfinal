module.exports = {
	name: "agregar",
	alias: ["add"],
    use: "<tag>",
	desc: "add Member To Admin",
	type: "group",
	start: async(killua, m, { text, prefix, command }) => {
        if (!text) return m.reply(`Example: ${prefix + command} @tag`)
		let users = m.quoted ? [m.quoted.sender] : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		for (let i of users) await killua.groupParticipantsUpdate(m.from, [i], "add")

		await m.reply("Suksess")
	},
    isGroup: true,
    isAdmin: true,
	isBotAdmin: true,
}