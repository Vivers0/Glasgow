const axios = require('axios')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function main(type, number, text) {
    
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
        return console.log(document.querySelector("video").src)
    } catch(err) {
       return console.log("YEs")
    }
        
})

}


main("op", 12, "Dragon Ball GT")
