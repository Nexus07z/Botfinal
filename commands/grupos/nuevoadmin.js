module.exports = {
	name: "nuevoadmin",
	alias: ["newadmin","promote","pm"],
    use: "<tag>",
	desc: "Promote Member To Admin",
	type: "group",
	start: async(killua, m, { text, prefix, command }) => {
        if (!text) return m.reply(`Example: ${prefix + command} @tag`)
		let me = m.mentions[0] ? m.mentions[0] : m.quoted ? [m.quoted.sender] : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await killua.groupParticipantsUpdate(m.from, [me], "promote")
		await m.reply("Suksess")
	},
    isGroup: true,
    isAdmin: true,
	isBotAdmin: true,
}
