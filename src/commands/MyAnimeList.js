const axios = require('axios')
const jsdom = require("jsdom");
const jikanjs  = require('jikanjs');
const { JSDOM } = jsdom;

class MyAnimeList {
    constructor(message) {
        this.message = message
        this.document = ""
    }
     
    getAnimeInfoForMusic(link) {
        let obj = {}
        obj.op = []
        obj.ed = []
         return new Promise(async (resolve, reject) => {
             try {
                 let request = await axios({
                     method: 'GET',
                     url: link,
                     headers: {
                         'Content-Type': 'application/json'
                     }
                 })
             
                 let result = request.data;
                 let { document } = (new JSDOM(result)).window;
                 this.document =  document;
                 

                 obj.name = document.querySelector("#contentWrapper > div:nth-child(1) > div > div.h1-title > div > h1 > strong").textContent
                 obj.score = document.querySelector(".fl-l.score").firstChild.textContent
                 obj.studio = document.querySelector(".information.studio.author").firstChild.textContent
                 obj.image = document.querySelector("#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img").attributes['data-src'].textContent
         

                resolve(obj)
            } catch(err) {
            resolve("404")
            console.log(err)
            }      
        })
    }

    typeAnime(document = this.document) {
        let allSpan = document.getElementsByClassName("dark_text")
            
        for(let i = 0; i < allSpan.length; i++) {
            if (allSpan[i].textContent === "Type:") return allSpan[i].parentElement.lastChild.textContent;
        }
    }

    seasonAnime(document = this.document) {
        let selector = document.querySelector(".information.season")
        let allSpan = document.getElementsByClassName("dark_text")    
     
        for(let i = 0; i < allSpan.length; i++) {
            return allSpan[i].textContent === "Aired:" ? allSpan[i].parentElement.textContent.replace(/\n  Aired:\n  /i, '').split("\n")[0] : selector.firstChild.textContent;
        }
        
    }

    episodesAnime(document = this.document) {
        let allSpan = document.getElementsByClassName("dark_text")
            
        for(let i=0; i<allSpan.length; i++) {
            if (allSpan[i].textContent === "Episodes:") return allSpan[i].parentElement.textContent.replace(/[^\d]/g,'');
        }
    }

    musicOpAnime(document = this.document) {
        let arr = new Array()
        const selector = document.querySelector(".theme-songs.js-theme-songs.opnening")

        for (let i = 0; i < selector.childNodes.length; i++) {
            arr.push(selector.childNodes[i].textContent)
        }
        return arr;                              
    }

    musicEdAnime(document = this.document) {
        let arr = new Array()
        const selector = document.querySelector(".theme-songs.js-theme-songs.ending")

        for (let i = 0; i < selector.childNodes.length; i++) {
            arr.push(selector.childNodes[i].textContent)
        }
        return arr;
    }

   
}


module.exports = { MyAnimeList };