
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


// https://console.firebase.google.com/u/0/?pli=1

// To Run:
// cd into functions
// npm run serve
// you should be able to see it here" http://localhost:5000/YOUR-PROJECT/REGION/scraper  AKA  http://localhost:5001/cheerio-fireship-webscraper/us-central1/scraper


// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// const functions = require('firebase-functions');
// const cors = require('cors')({ origin: true });           // setting origin to true will give any URLs access to this function. It specifies which URLs have access to this function

const cheerio = require('cheerio');     // a NodeJS implementation of jQuery. It makes it a lot easier to scrape webpages.
const getUrls = require('get-urls');    // a utility for extracting URLs from text(string).
const fetch = require('node-fetch');    // a NodeJS implementation of the browser Fetch API. Promise based HTTP that mirrors the Fetch API in the browser

// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Ohh I'm working!!");
// });

// Link Preview
/* Link preview metatag web scraper */
/* BASIC HTTP REQUEST for Rendering a Link Preview like when pasting a twitter URL into an app */
const scrapeMetatags = (text) => {      // this is a helper function. 

    const urls = Array.from( getUrls(text) );   // scrapeMetatags takes text as an argument like a Tweet that has a couple of URLs included in it. getUrls extracts all the valid URLs from text.

    const requests = urls.map(async url => {    // then, map all these URLs to individual requests. 
        const res = await fetch(url);           // for each URL, we make a request using fetch. 

        const html = await res.text();          // this converts the response to text, which will just be a string of HTML. 
        const $ = cheerio.load(html);           // Then we load that text into Cheerio, which makes it easy to parse nodes at the DOM. $ dollar sign is just jQuery to select nodes from the DOM with a selector.

        const getMetatag = (name) =>                // They have access to the $(dollar signs) to Look for the first available metatag. 
            $(`meta[name=${name}]`).attr('content') ||      // all these to scrape as many metatags as possible. This helper function will keep our code DRY and concise.
            $(`meta[name="og:${name}"]`).attr('content') ||
            $(`meta[name="twitter:${name}"]`).attr('content')

        return {
            url,
            title: $('title').first().text(),               // first thing we scrape from the HTML is the title. 
            favicon: $('link[rel="shortcut icon"]').attr('href'),   // the favicon, and it's href attr so we can render that image in our preview.
            // description: $('meta[name=description]').attr('content'),    // Most of the data we want will come from these metatags, but we don't need the OpenGraph or Twitter metatags or every tag put by developers. We just want the right data to show in our link preview. 
            description: getMetatag('description'),         // these get our metatags that we want to return to the front end for our link preview.
            image: getMetatag('image'),
            author: getMetatag('author'),
        }
    })

    return Promise.all(requests);
}
// with the scrapeMetatags() helper function and the exports.scraper Firebase HTTP Cloud Function set up, you can do in your CLI, npm run serve and
// and take the data and make a UI web page application.




// /* INSTAGRAM SCRAPER */

// const puppeteer = require('puppeteer');
// const scrapeImages = async (username) => {              // username is the actual instagram page we want to scrape images from.
//     const browser = await puppeteer.launch( { headless: true } ); // these two initialize puppeteer.
//     const page = await browser.newPage();

//     await page.goto('https://instagram.com/accounts/login/');    // point it to the ig login page . Going to this page on puppeteer is just like visiting it in a Chrome Browser

//     // Login form
//     await page.screenshot({path: '1.png'});                     // inspect the state of the website at any time by taking a screen shot of the page?
   
//     await page.type('[name=username]', 'stan.wav');         // Use page.type() method to select an element from the DOM and simulate typing characters into the form. 
    
//     await page.type('[name=password]', 'some_password');                   // lastly, submit the form to log the user in 

    
    
//     await page.screenshot({path: '2.png'});    // you have unlimited possibilities for interacting with the website.

//     await page.click('[type=submit]');

//     // Social Page

//     await page.waitFor(5000);                  // after you've interacted with it, you might want to waitFor the page to update. You can do this manually by waiting 5 seconds.

//     await page.goto(`https://www.instagram.com/${username}`);

//     await page.waitForSelector('img ', {        // or, we're waiting for react to render the image tags. 
//         visible: true,
//     });

//     await page.screenshot({path: '3.png'});     // so we'll wait for that selector to appear in the DOM.


//     // Execute code in the DOM
//     const data = await page.evaluate( () => {       // to actually scrape data at any given time, we can use page.evaluate(). The code you write in here, is like being in the actual browser. so you can use document.querySelectorAll, etc. 

//         const images = document.querySelectorAll('img');    // and page.evaluate() gives us a callback function, which gives us access to the DOM APIs in Puppeteer. So you can pause the page loading at any time and scrape HTML from there. 
        
//         const urls = Array.from(images).map(v => v.src);    // map the images down to the image src as an array of strings.    

//         return urls         // and return that to the evaluate callback.
//     });

//     await browser.close();  // close it out.

//     console.log(data)

//     return data;            // return data back to the client.

// }        








// // This sets it up for a Firebase Cloud function
// // /* This way is an HTTP Function. You can use the scraper in an HTTP Cloud Function. */
// exports.scraper = functions.https.onRequest( async (request, response) => {
//     cors(request, response, async () => {               // we wrap it in CORS so it can be run successfully from any front-end application. 


//         const body = request.body;          // the frontend application will send a JSON string as the request body. So we'll parse that string
//         // const data = await scrapeMetatags(body.text);   // , and then we'll pass that body text to our scrapeMetatags() function. 
//         const data = await scrapeImages(body.text);
        
//         response.send(data)                 // The result of that function will be an array of objects. Where each object is the URL data that was scraped from that third-party website. 

//     });
// });
