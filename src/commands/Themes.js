const { get } = require("superagent")
const jikan = require('jikanjs')
const { MessageEmbed } = require("discord.js")

class Themes {
    constructor(message) {
        this.message = message
    }

    parsingAnimeThemes(title, theme, num) {
        jikan.search('anime', title).then(async res => {
            let result = res.results[0]
            // console.log(result)
            let { body } = await get(`https://animethemes-api.herokuapp.com/api/v1/anime/${result.mal_id}`);
            this.getLinkAnime(body, theme, num).then(themeLink => {
                let embed = new MessageEmbed()
                    .setDescription(`[${result.title}](${result.url}) ${themeLink.type} "${themeLink.title}"`)
                    .setColor("BLUE");
                this.message.channel.send(themeLink.link, embed)
            })
        })
    }

    async getLinkAnime(json, theme, num) {
        return new Promise(async (resolve, reject) => {
        let themes = json.themes
        // let getFirstTheme = () => {
        //     for (let i = 0; i<themes.length; i++) {

        //     }
        //     if (theme.toUpperCase() === "OP") {
        //         resolve({
        //             link: themes[i].mirrors[0].mirror,
        //             title: themes[i].title[0],
        //             type: themes[i].type[0]
        //         })
        //     }
        //     if (theme.toUpperCase() === "ED") {
        //         resolve({
        //             link: themes[i].mirrors[-1].mirror,
        //             title: themes[i].title[-1],
        //             type: themes[i].type[-1]
        //         })
        //     }
        // }
        // if (themes.length <= 2) getFirstTheme()
        // console.log(themes)
        
        try {
        for (let i = 0; i<themes.length; i++) {
            console.log(themes[i].type.split(" ")[1])
            if(themes[i].type.indexOf(" ") !== -1 || themes[i].type.match(/\d+/g)[0] === 0) {
                if (themes[i].type.split(' ')[1].startsWith("V")) {
                if(themes[i].type.startsWith('OP')) {
                    if (theme.toUpperCase() === "OP") {
                        resolve({
                            link: themes[i].mirrors[0].mirror,
                            title: themes[i].title,
                            type: themes[i].type
                        })
                    } 
                } else if (themes[i].type.startsWith('ED')) {
                    if (theme.toUpperCase() === "ED") {
                        resolve({
                            link: themes[i].mirrors[0].mirror,
                            title: themes[i].title,
                            type: themes[i].type
                        })
                    }    
                }
            }
            }
            switch (true) {
                
                case themes[i].type.startsWith('OP'):
                    if (theme.toUpperCase() === "OP") {
                        if (themes[i].type.match(/\d+/g)[0] === num) {
                            resolve({
                                link: themes[i].mirrors[0].mirror,
                                title: themes[i].title,
                                type: themes[i].type
                            })
                        }
                    } 
                    break
                case themes[i].type.startsWith('ED'):
                    if (theme.toUpperCase() === "ED") {
                        if (themes[i].type.match(/\d+/g)[0] === num) {
                            resolve({
                                link: themes[i].mirrors[0].mirror,
                                title: themes[i].title,
                                type: themes[i].type
                            })
                        }
                    } 
                    break
                

            }
        }
    } catch(err) {
        reject(err)
    }
    })
    }
}

module.exports = Themes