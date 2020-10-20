const axios = require('axios')
const jsdom = require("jsdom");
const jikanjs  = require('jikanjs');
const { JSDOM } = jsdom;

class MyAnimeList {
    constructor() {}
     
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

                 obj.name = document.querySelector("#contentWrapper > div:nth-child(1) > div > div.h1-title > div > h1 > strong").textContent
                 obj.score = document.querySelector(".fl-l.score").firstChild.textContent
                 obj.studio = document.querySelector(".information.studio.author").firstChild.textContent
                 obj.image = document.querySelector("#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img").attributes['data-src'].textContent


                function getTypeAnime(document) {
                    let allSpan = document.getElementsByClassName("dark_text")
            
                    for(let i=0; i<allSpan.length; i++) {
                        if (allSpan[i].textContent === "Type:") {
                            return obj.type = allSpan[i].parentElement.lastChild.textContent
                        }
                    }
                }
            
                function getEpisodesAnime(document) {
                    let allSpan = document.getElementsByClassName("dark_text")
            
                    for(let i=0; i<allSpan.length; i++) {
                        if (allSpan[i].textContent === "Episodes:") {
                            return obj.episodes = allSpan[i].parentElement.textContent.replace(/[^\d]/g,'')
                        }
                    }
                }
            
                function getSeasonAnime(document) {
                    let selector = document.querySelector(".information.season")
            
                    if(!selector) {
                        let allSpan = document.getElementsByClassName("dark_text")
                        for(let i=0; i<allSpan.length; i++) {
                            if (allSpan[i].textContent === "Aired:") {
                                return obj.season = allSpan[i].parentElement.textContent.replace(/\n  Aired:\n  /i,'').split("\n")[0]
                            }
                        }
                                               
                    } else {
                        return obj.season = selector.firstChild.textContent;
                    }
                }

                getTypeAnime(document)
                getEpisodesAnime(document)
                getSeasonAnime(document)

                 for (let i=0; i<document.querySelector(".theme-songs.js-theme-songs.ending").childNodes.length;i++) {
                     obj.op.push(document.querySelector(".theme-songs.js-theme-songs.ending").childNodes[i].textContent)
                 }
                 for (let i=0; i<document.querySelector(".theme-songs.js-theme-songs.opnening").childNodes.length;i++) {
                     obj.ed.push(document.querySelector(".theme-songs.js-theme-songs.opnening").childNodes[i].textContent)
                 }
                resolve(obj)
            } catch(err) {
            resolve("404")
            console.log(err)
            }      
        })
    }

    

}


module.exports = { MyAnimeList };