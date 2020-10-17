const { Client } = require("discord.js")
const client = new Client()
const { Embed } = require("./commands/embed")


client.on("ready", () => console.log("Ready!"))

client.on("message", message => {
    const embed = new Embed(message)
    const [name, ...args] = message.content.slice(2).split(/ +/);

    if (name === "anime") {
        let nameTitle = message.content.slice(name.length + args[1].length + 7)
        embed.animeCommand(args[0], args[1], nameTitle)
    }    
})

client.login()
