const axios = require('axios')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class OpeningsNinja {
    constructor() {

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
            
                let result = request.data;
                const dom = new JSDOM(result)
                let document = dom.window.document;
                resolve(document.querySelector("video").src)
            } catch(err) {
            resolve("404")
            }      
        })
    }
}


module.exports = { OpeningsNinja };