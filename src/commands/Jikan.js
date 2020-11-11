const { MessageEmbed } = require("discord.js")
const jikan = require("jikanjs")

class Jikan {
    constructor(message) {
        this.message = message
    }

    getAnimeInformation(name) {
        jikan.search('anime', name).then(res => {
            let anime = res.results[0]
            let embed = new MessageEmbed()
                .setDescription(`[${anime.title}](${anime.url})`)
                .setThumbnail(anime.image_url)
                .addField('Type', anime.type, true)
                .addField('Episodes', anime.episodes, true)
                .addField('Score', anime.score, true)

            this.message.channel.send(embed)
            })
        }   

    // parsingAnimeInformation(name) {
    //     const anime = this.getAnimeInformation(name)
    //     return new MessageEmbed()
    //         .setDescription(`[${anime.title}](${anime.url})`)
    //         .setThumbnail(anime.image_url)
    //         .addField('Type', anime.type, true)
    //         .addField('Episodes', anime.episodes, true)
    //         .addField('Score', anime.score, true);
    // }
}

module.exports = Jikan