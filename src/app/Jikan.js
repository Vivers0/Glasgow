const jikan = require('jikanjs')
const { Embed } = require('./embed') 

class Jikan {
    constructor(name, { args, message }) {
        this.name = name
        this.args = args
        this.message = message
        this.search(this.args.join(' '))
    }

    async search(name) {
        const embed = new Embed()
        switch(this.name) {
            case 'anime':
                let anime = await jikan.search('anime', name)
                embed.animeEmbed(anime.results, this.message)
                break;
            case 'manga':
                let manga = await jikan.search('manga', name)
                embed.mangaEmbed(manga.results, this.message)
                break;
        }
    }
}

module.exports = { Jikan }