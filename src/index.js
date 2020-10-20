require("dotenv").config({ path: "../.env" })
const { Client, MessageEmbed } = require("discord.js")
const client = new Client()
const { Embed } = require("./commands/embed")
const package = require("../package.json")


client.on("ready", () => {
    console.log("Ready!")
    client.user.setActivity(`${package.version} | g!help`, { type: 'WATCHING' })
})

client.on("message", message => {
    if (!message.content.startsWith(process.env.PREFIX)) return;
    const embed = new Embed(message)
    const [name, ...args] = message.content.slice(2).split(/ +/);

    if (name === "music") {
        if (!(typeof(args[0]) !== String) | (args[0].length > 2) | !args[0]) return message.channel.send(new MessageEmbed()
        .setDescription("Error, Сould not find the requested song. Try to enter the full anime name")
        .setColor("RED"));
        if (!(typeof(args[1]) !== Number) | !args[1]) return message.channel.send(new MessageEmbed()
        .setDescription("Error, Сould not find the requested song. Try to enter the full anime name")
        .setColor("RED"));
        let nameTitle = message.content.slice(name.length + args[1].length + 7)
        embed.songsCommand(args[0], args[1], nameTitle)
    }
    
    if (name === "anime") {
        message.channel.send(new MessageEmbed().setDescription("Wait...").setColor("ORANGE")).then(msg => {
            let id = msg.id
            let nameTitle = message.content.slice(name.length + 3)
            embed.animeCommand(nameTitle, id)
        })
    }

    if (name === "help") {
        embed.helpCommand()
    }
})

client.login(process.env.TOKEN)
