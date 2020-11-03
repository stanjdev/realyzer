// const express = require('express');
const cheerio = require('cheerio');
const getURL = require('get-urls');
const fetch = require('node-fetch');
const request = require('request');

// const app = express();
const images = [];

// image scraper server-side
export default (req, res) => {

  if (req.body) {
    let url = req.body;
    let actualURL = getURL(url).values().next().value
  
    request(actualURL, (err, res, html) => {
  
      if (!err && res.statusCode === 200) {
        console.log("Request successful!")
  
        const $ = cheerio.load(html)
        $('img').each((i, image) => {
          if ($(image).attr('src') !== '' && $(image).attr('src') !== undefined) {
            images.push($(image).attr('src'))
          }
        })
      } else res.send("not valid URL")
    })
    console.log(images)
    res.send(images)
  }

}