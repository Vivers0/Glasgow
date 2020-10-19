const {  MessageEmbed, Message } = require("discord.js")
const { OpeningsNinja } = require("./OpeningsNinja")
const { MyAnimeList } = require("./MyAnimeList")
const { createAndGetLink } = new OpeningsNinja()
const { getAnimeInfoForMusic } = new MyAnimeList()
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
            getAnimeInfoForMusic(res.results[0].url).then(req => {
                if (req === "404") {
                    this.message.channel.messages.fetch(id).then(msg => {
                        let embed = new MessageEmbed()
                        .setDescription("Error, Сould not find the requested song. Try to enter the full anime name")
                        .setColor("RED")
    
                    msg.edit(embed)
                    })
                } else {
                    this.message.channel.messages.fetch(id).then(msg => {
                        let embed = new MessageEmbed()
                            .setAuthor(req.name)
                            .setThumbnail(req.image)
                            .setDescription(`Score: **${req.score}**`)
                            .addField("Episodes", checkOngoing(req.episodes.replace(/\n  Episodes:\n  /i,'').split("\n")[0]), true)
                            .addField("Season", req.season, true)
                            .addField("Type", req.type, false)  
                            .addField("Studio", req.studio, true)
                            .addField("Opening Themes", editArrayMusic(req.op).map(m=>m))
                            .addField("Ending Themes", editArrayMusic(req.ed).map(m=>m))
                            .setFooter("g!anime [Anime]")
                            .setColor("BLUE")
                            
                        function checkOngoing(str) {
                            if (str === "Unknown") {
                                return 'Ongoing'
                            } else {
                                return str;
                            }
                        }

                        function editArrayMusic(array) {
                            for (let i=0; i<=array.length; i++) {
                                if (array[i].indexOf('') == -1) delete array[i];
                                return array
                            }
                        }

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