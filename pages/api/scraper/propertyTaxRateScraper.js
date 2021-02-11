const axios = require("axios").default;
const cheerio = require("cheerio")
const request = require('request');


export default (req, res) => {
  
  // ASYNC FUNCTIONS! 
  const fetchHTML = async url => {
    try {
      const { data } = await axios.get(url);
      // console.log(data)
      return data;
    } catch (error) {
      console.error(`ERROR from fetchHTML function!`)
    }
  }
  
  
  // POSTMAN TEST:
  const scrapeStream = async () => {
    const url = "https://wallethub.com/edu/states-with-the-highest-and-lowest-property-taxes/11585"
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);
    
    // let siteName = $('title').text();
    // console.log(siteName)
    
    let tableRows = $("#scroller > main > article > div.edu-art-with-side.edu-art-square-social > div > div.edu-art-content-table.with-links.text-select > div:nth-child(11) > table > tbody > tr");
    // tableRows.forEach((i, row) => console.log(row))
    // console.log(tableRows[2].children[1].children[0].data)
    // console.log(tableRows[2].children[2].children[0].data)
    // console.log(tableRows.text())
    
    var ratesData = {};
    tableRows.each((index,element) => {
      ratesData[element.children[1].children[0].data] = element.children[2].children[0].data
    });
    // console.log(ratesData)
    res.send(ratesData)


    // var ratesData = [];
    // tableRows.each((index,element) => {
    //   ratesData.push({
    //       state: element.children[1].children[0].data,
    //       rate: element.children[2].children[0].data,
    //   })
    // });
    // console.log(ratesData)
    // res.send(ratesData)

  }
  
  scrapeStream();
}



















// const fetchHTML = async url => {
//   try {
//     const { data } = await axios.get(url);
//     return data;
//   } catch (error) {
//     console.error(`ERROR DUDE`)
//   }
// }

// const scrapeStream = async () => {
//   const streamURL = "https://wallethub.com/edu/states-with-the-highest-and-lowest-property-taxes/11585";
//   const html = await fetchHTML(streamURL);

//   const selector = cheerio.load(html);

//   const tableData = selector("body")
//     .find("tbody > tr")

//   const rows = tableData.map((idx, el) => {
//     const elSelector = selector(el);
//     return elSelector.text();
//   })
//   console.log(rows)
// }

// scrapeStream();




// const $ = cheerio.load("https://e.infogram.com/66661e4a-4684-4adc-8a4b-a4b292776578?src=embed")

// request({
//     method: 'GET',
//     // url: 'https://e.infogram.com/66661e4a-4684-4adc-8a4b-a4b292776578?src=embed'
//     url: 'https://www.fool.com/millionacres/research/property-taxes-state/'
// }, (err, res, body) => {

//     if (err) return console.error(err);

//     let $ = cheerio.load(body);

//     let main = $('main');

//     let h1El = $('div');

//     let parentEl = h1El.parent();

//     console.log(parentEl.get(0).tagName)
// });



// const fetchHTML = async url => {
//   const { data } = await axios.get(url)
//   return cheerio.load(data)
// }

// const $ = fetchHTML("https://e.infogram.com/66661e4a-4684-4adc-8a4b-a4b292776578?src=embed")

// // Print the full HTML
// console.log(`Site HTML: ${$.html()}\n\n`)

// // Print some specific page content
// console.log(`First h1 tag: ${$('h1').text()}`)