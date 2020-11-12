require("dotenv").config({ path: "../.env" })
const { Client, MessageEmbed } = require("discord.js")
const client = new Client()
const package = require("../package.json")
const Jikan = require("./commands/Jikan")
const Theme = require("./commands/OpeningsNinja")


client.on("ready", () => {
    console.log("Ready!")
    client.user.setActivity(`${package.version} | g!help`, { type: 'WATCHING' })
})

client.on("message", message => {
    if (!message.content.startsWith(process.env.PREFIX)) return;
    const jikan = new Jikan(message)
    const theme = new Theme(message)
    const [name, ...args] = message.content.slice(2).split(/ +/);

    if (name === "theme") {
        if (!(typeof(args[0]) !== String) | (args[0].length > 2) | !args[0]) return message.channel.send("Error, Сould not find the requested song. Try to enter the full anime name")
        if (!(typeof(args[1]) !== Number) | !args[1]) return message.channel.send("Error, Сould not find the requested song. Try to enter the full anime name")
        let nameTitle = message.content.slice(name.length + args[1].length + 7)
        theme.generateEmbed(args[0], args[1], nameTitle)
    }
    
    if (name === "anime") {
        let title = message.content.slice(name.length + 3)
        jikan.getAnimeInformation(title)
    }

    // if (name === "help") {
    //     embed.helpCommand()
    // }
})

client.login(process.env.TOKEN)
