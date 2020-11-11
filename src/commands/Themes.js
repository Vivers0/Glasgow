const { get } = require("superagent")
const jikan = require('jikanjs')

class Themes {
    constructor(message) {
        this.message = message
    }

    parsingAnimeThemes(title, themes, num) {
        jikan.search('anime', title).then(async res => {
            let id = res.results[0].mal_id
            let { body } = await get(`https://animethemes-api.herokuapp.com/api/v1/anime/${id}`);
            // console.log(body)
            this.getLinkAnime(body, num) 
        })
    }

    async getLinkAnime(json, num = 3) {
        let themes = json.themes
        for (let i = 0; i<themes.length; i++) {
            console.log(themes[i])
            // switch (true) {
            //     case themes[i].type.startsWith('OP'):
                     
            //         console.log(themes[i].type[num])
            // }
        }
    }
}

module.exports = Themes