const { Client, MessageEmbed } = require("discord.js")
const { OpeningsNinja } = require("./OpeningsNinja")
const { createAndGetLink } = new OpeningsNinja()

class Embed {
    constructor(message) {
        this.message = message;
    }

    animeCommand(type, number, title) {
        let nameTitle = title.replace(/-!,/g, '-').toLowerCase();
        console.log(nameTitle)
        createAndGetLink(type, number, nameTitle).then(req => {
            if (req === "404") {
                this.message.channel.send(this.generateEmbed("Ссылка недействительна"))
            } else {
                this.message.channel.send(this.generateEmbed(req))
            }
        })
    }

    generateEmbed(req) {

    }
}

module.exports = { Embed }