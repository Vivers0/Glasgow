const { MessageEmbed } = require("discord.js")
const { OpeningsNinja } = require("./OpeningsNinja")
const { MyAnimeList } = require("./MyAnimeList")
const { createAndGetLink } = new OpeningsNinja()
const MAL = new MyAnimeList()
const jikan = require('jikanjs');


class Embed {
    constructor(message) {
        this.message = message;
    }

    songsCommand(type, number, title) {
        let nameTitle = title.replace(/-!,/g, '-').toLowerCase();
        createAndGetLink(type, number, nameTitle).then(req => {
             if (req === "404") {
                 let embed = new MessageEmbed()
                     .setDescription("Error, Сould not find the requested song. Try to enter the full anime name")
                     .setColor("RED")

                 this.message.channel.send(embed)
             } else {
                 let embed = new MessageEmbed()
                     .setAuthor(req.name.replace(req.name.split(" ")[0], ''))
                     .addField("Anime", req.anime, true)
                     .addField("Type", type.toUpperCase(), true)
                     .addField("Song #", number, true)
                     .setColor("BLUE")
                     .setFooter("g!music [Type] [Number Song] [Name Anime]")

                this.message.channel.send(req.video, embed)
            }
        })
    }

    animeCommand(name, id) {
        jikan.search("anime", name).then(res => {
            MAL.getAnimeInfoForMusic(res.results[0].url).then(req => {
                if (req === "404") {
                    this.message.channel.messages.fetch(id).then(msg => {
                        let embed = new MessageEmbed()
                        .setDescription("Error, Сould not find the requested song. Try to enter the full anime name")
                        .setColor("RED")
    
                    msg.edit(embed)
                    })
                } else {
                    
                    this.message.channel.messages.fetch(id).then(async msg => {
                        const type = await MAL.typeAnime()
                        const season = await MAL.seasonAnime()
                        const episodes = await MAL.episodesAnime()
                        const musicOP = await MAL.musicOpAnime()
                        const musicED = await MAL.musicEdAnime()
                        const music = (array) => {
                            for (let i=0; i<=array.length; i++) {
                                if (array[i].indexOf('') == -1) delete array[i];
                                return array.map(m => m)
                            }
                        }
                        let embed = new MessageEmbed()
                            .setAuthor(req.name)
                            .setThumbnail(req.image)
                            .setDescription(`
                                **MyAnimeList**: [Click](${res.results[0].url})\n
                                **Score**: ${req.score}\n
                                **Episodes**: ${episodes}\n
                                **Season**: ${season}\n
                                **Type**: ${type}\n
                                **Studio**: ${req.studio}\n
                                `)
                            .addField("Opening Themes", music(musicOP))
                            .addField("Ending Themes", music(musicED))
                            .setFooter("g!anime [Anime]")
                            .setColor("BLUE")
                            

                        msg.edit(embed)
                    })
                }
            })   
        })
    }

    helpCommand() {
        let embed = new MessageEmbed()
            .setAuthor('Information')
            .setDescription(`Author: <@475259737613795328>`)
            .addField("Command:", "**g!music**: Get information about anime music\n**g!anime**: Get information about anime", true)
            .addField('Example', '\n\n**g!music**: g!music op 2 black clover\n**g!anime**: g!anime galaxy express 999', true)
            .setColor("GREEN")

            this.message.channel.send(embed)
    }
}

module.exports = { Embed }