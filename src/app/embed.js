const { MessageEmbed } = require('discord.js')

class Embed {
    constructor() {}

    animeEmbed(array, message) {
        const descriptionGenerator = ({ title, url, episodes, rated, score, type, synopsis, start_date, end_date }) => {
            const getDate = () => {
                const pad = (s) => { 
                    return (s < 10) ? '0' + s : s
                 }
                 let start = new Date(start_date)
                 let end = new Date(end_date)
                 let start_time = [pad(start.getDate()), pad(start.getMonth()+1), start.getFullYear()].join('/')
                 let end_time = [pad(end.getDate()), pad(end.getMonth()+1), end.getFullYear()].join('/')
                return end_date == null ? `${start_time} - Ongoing` : `${start_time} - ${end_time}`
            }
            return `[${title}](${url})\n\n**Score: ${score}**\nEpisodes: ${episodes}\nDate: ${getDate()}\nRated: ${rated}\nType: ${type}\nSynopsis: *${synopsis}*`
        }
        const pages = array.length
        let page = 0
        let { image_url } = array[page]
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setFooter(`Page 1 of ${pages}`)
            .setThumbnail(image_url)
            .setDescription(descriptionGenerator(array[page])) 
        message.channel.send(embed)
        .then(msg => {
            msg.react('⏪')
            msg.react('⏩')
            const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
            const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;
            const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 }); 
            const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
            backwards.on('collect', r => { 
                if (page === 1) return; 
                page--;
                let { image_url } = array[page-1]
                embed.setThumbnail(image_url) 
                embed.setDescription(descriptionGenerator(array[page-1])) 
                embed.setFooter(`Page ${page} of ${array.length}`); 
                msg.edit(embed) 
            })
            forwards.on('collect', r => { 
                if (page === array.length) return; 
                page++;
                let { image_url } = array[page+1]
                embed.setThumbnail(image_url)
                embed.setDescription(descriptionGenerator(array[page+1]))
                embed.setFooter(`Page ${page+1} of ${array.length}`); 
                msg.edit(embed) 
            })
        })
    }

    mangaEmbed(array, message) {
        const descriptionGenerator = ({ title, url, volumes, score, type, synopsis, start_date, end_date, chapters }) => {
            const getDate = () => {
                const pad = (s) => { 
                    return (s < 10) ? '0' + s : s
                 }
                 let start = new Date(start_date)
                 let end = new Date(end_date)
                 let start_time = [pad(start.getDate()), pad(start.getMonth()+1), start.getFullYear()].join('/')
                 let end_time = [pad(end.getDate()), pad(end.getMonth()+1), end.getFullYear()].join('/')
                return end_date == null ? `${start_time} - Ongoing` : `${start_time} - ${end_time}`
            }
            return `[${title}](${url})\n\n**Score: ${score}**\nVolumes: ${volumes}\nChapters: ${chapters}\nDate: ${getDate()}\nType: ${type}\nSynopsis: *${synopsis}*`
        }
        const pages = array.length
        let page = 0
        let { image_url } = array[page]
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setFooter(`Page 1 of ${pages}`)
            .setThumbnail(image_url)
            .setDescription(descriptionGenerator(array[page])) 
        message.channel.send(embed)
        .then(msg => {
            msg.react('⏪')
            msg.react('⏩')
            const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
            const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;
            const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 }); 
            const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
            backwards.on('collect', r => { 
                if (page === 1) return; 
                page--;
                let { image_url } = array[page-1]
                embed.setThumbnail(image_url) 
                embed.setDescription(descriptionGenerator(array[page-1])) 
                embed.setFooter(`Page ${page} of ${array.length}`); 
                msg.edit(embed) 
            })
            forwards.on('collect', r => { 
                if (page === array.length) return; 
                page++;
                let { image_url } = array[page+1]
                embed.setThumbnail(image_url)
                embed.setDescription(descriptionGenerator(array[page+1]))
                embed.setFooter(`Page ${page+1} of ${array.length}`); 
                msg.edit(embed) 
            })
        })
    }
}

module.exports = { Embed }