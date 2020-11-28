const { get } = require('superagent')
const jikan = require('jikanjs')
const { MessageEmbed } = require('discord.js')

class AnimeThemes {
    constructor(message) {
        this.message = message
    }

    async getExistsName(title) {
        let res = await jikan.search('anime', title)
        return { name: res.results[0].title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').split(' ').join('_').toLowerCase(), image: res.results[0].image_url, url: res.results[0].url };
    }

    getJsonRequest(title) {
        return new Promise(async (resolve, reject) => {
            let url = `https://animethemes.dev/api/anime/${title}`
            let { body } = await get(url)
            resolve(body)
        })
    }

    async getJson(title) {
        const titleInfo = await this.getExistsName(title) 
        const json = await this.getJsonRequest(titleInfo.name)

        return {
            name: json['name'],
            themes: json['themes'],
            url: titleInfo.url,
            image: titleInfo.image
        }
    } 

    async answer(title, num) {
      const json = await this.getJson(title)
      console.log(json)
      let video, type, nameTheme;

      for (let i = 0; i < json.themes.length; i++) {
        console.log(num, json.themes[i].slug)
          if (num.toUpperCase() === json.themes[i].slug) {
            let video, type, nameTheme;
            video = `https://animethemes.moe/video/${json.themes[i].entries[0].videos[0].basename}`
            type = json.themes[i].slug
            nameTheme = json.themes[i].title
            } else {
               
            }
      }
    
      let embed = new MessageEmbed()
        .setDescription(`[${json.name}](${json.url})`)
        .addField('Type:', type)
        .addField('Title:', nameTheme)
        .setThumbnail(json.image)
        .setColor('GREEN');

        this.message.channel.send(video, embed)
    }
}

module.exports = AnimeThemes