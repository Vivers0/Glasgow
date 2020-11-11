const axios = require('axios')
const jsdom = require("jsdom");
const { search } = require("jikanjs")
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

}


module.exports = OpeningsNinja