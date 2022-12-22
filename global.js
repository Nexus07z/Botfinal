const fs = require("fs")

global.user = require("./data/user")
global.group = require("./data/group")
global._user = JSON.parse(fs.readFileSync("./database/user.json"))
global._group = JSON.parse(fs.readFileSync("./database/group.json"))
global.prefix = ['.']

global.mess = (type, m) => {
    let msg = {
        wait: '*Espera un momento por favor...*',
        owner: '[❗] *ALERTA*\n\n*¡Este comando solo puede ser utilizado por el propietario!*',
        premium: '[❗] *ALERTA*\n\n*¡Este comando solo puede ser utilizado por usuarios Premium!*',
        group: '[❗] *ALERTA*\n\n*¡Este comando solo puede ser utilizado en grupos!*',
        private: '[❗] *ALERTA*\n\n*¡Este comando solo se puede usar en el chat privado!*',
        admin: '[❗] *ALERTA*\n\n*¡Este comando solo puede ser utilizado por los administradores del grupo!*',
        botAdmin: '[❗] *ALERTA*\n\n*¡Este comando solo se puede usar cuando el Bot es administrador!*',
        bot: '*Este comando es para el uso exclusivo del Bot.*',
        dead: '*Este comando está actualmente deshabilitado.*',
        media: '*Debes etiquetar un archivo multimedia con el comando.*',
        error: "*Ocurrió un problema, puedes intentarlo nuevamente más tarde.*"
    }[type]
    if (msg) return m.reply(msg, m.from, { quoted: m })
}