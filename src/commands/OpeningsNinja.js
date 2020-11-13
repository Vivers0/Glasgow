const axios = require('axios')
const jsdom = require("jsdom");
const { MessageEmbed } = require("discord.js")
const jikan = require("jikanjs")
const { JSDOM } = jsdom;


class OpeningsNinja {
    constructor(message) {
        this.message = message
    }

    createAndGetLink(type, number, text) {
       return new Promise(async (resolve, reject) => {
            let link = `https://openings.ninja/${text}/${type}/${number}`
            try {
                let request = await axios({
                    method: 'GET',
                    url: link,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                let obj = {}
            
                let result = request.data;
                const dom = new JSDOM(result)
                let document = dom.window.document;
                obj.video = document.querySelector("video").src
                obj.name = document.querySelector(".media-body.align-self-center").firstChild.textContent
                obj.anime = document.querySelector("#__layout > div > div.d-flex.flex-column.flex-sm-row.no-gutters.position-relative.content.position-relative > div.show-nav-container.col.col-md-auto.overflow-hidden > div > div:nth-child(1) > a:nth-child(1) > h1").textContent
                resolve(obj)
            } catch(err) {
            resolve("404")
            }      
        })
    }     

    async generateEmbed(type, number, title) {
        let nameTitle = this.rightNameAnime(title)
        this.createAndGetLink(type, number, nameTitle).then(req => {
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

    async rightNameAnime(title) {
        jikan.search('anime', title).then(res => {
           let name = res.results[0].title
           let rep = name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
           return rep.split(' ').join('-').toLowerCase()
        })
    }
}


module.exports = OpeningsNinja