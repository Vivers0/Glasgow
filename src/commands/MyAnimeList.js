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

                 if (document.querySelector("#content > table > tbody > tr > td:nth-child(2) > div.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(1) > td > div.pb16 > div.di-t.w100.mt12 > div.anime-detail-header-stats.di-tc.va-t > div.stats-block.po-r.clearfix > div.information-block.di-ib.clearfix > span.information.season > a").textContent === process.env.SEASON) {
                    obj.episodes = document.querySelector("#content > table > tbody > tr > td.borderClass > div > div:nth-child(13)").textContent
                    obj.type = document.querySelector("#content > table > tbody > tr > td.borderClass > div > div:nth-child(12) > a").textContent
                 } else {
                    obj.episodes = document.querySelector("#content > table > tbody > tr > td.borderClass > div > div:nth-child(14)").textContent
                    obj.type = document.querySelector("#content > table > tbody > tr > td.borderClass > div > div:nth-child(13) > a").textContent
                 }

                 obj.name = document.querySelector("#contentWrapper > div:nth-child(1) > div > div.h1-title > div > h1 > strong").textContent
                 obj.score = document.querySelector(".fl-l.score").firstChild.textContent
                 obj.season = document.querySelector(".information.season").firstChild.textContent
                 obj.studio = document.querySelector(".information.studio.author").firstChild.textContent
                 obj.image = document.querySelector("#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img").attributes['data-src'].textContent

                 for (let i=0; i<document.querySelector(".theme-songs.js-theme-songs.ending").childNodes.length;i++) {
                     obj.op.push(document.querySelector(".theme-songs.js-theme-songs.ending").childNodes[i].textContent)
                 }
                 for (let i=0; i<document.querySelector(".theme-songs.js-theme-songs.opnening").childNodes.length;i++) {
                     obj.ed.push(document.querySelector(".theme-songs.js-theme-songs.opnening").childNodes[i].textContent)
                 }
                 console.log(obj)
                resolve(obj)
            } catch(err) {
            resolve("404")
            }      
        })
    }

}


module.exports = { MyAnimeList };