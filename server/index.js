const path = require('path');
var express = require('express');
const { default: puppeteer } = require('puppeteer');
var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))


let page = null;

app.get('/click', function(req, res, next) {
    const { query } = req;

    (async() => {
        try {
            if (page) {
                await page.mouse.click(parseFloat(query.x), parseFloat(query.y));
            } else {
                throw new Error("Page not exist.");
            }
        } catch(e) {
            next(e);
        }
    })();
})

app.get('/launch', function(req, res, next) {
    const { query } = req;
    (async() => {
        try {
            const pathToExtension = path.resolve(__dirname, '../ext');
            const browser = await puppeteer.launch({
                handleSIGINT: false, // so Chrome doesn't exit when we quit Node.
                headless: query.is_headless === "true", // to see what's happening
                args: [
                    '--window-size=1280,720',
                    `--disable-extensions-except=${pathToExtension}`,
                    `--load-extension=${pathToExtension}`,
                ],
                defaultViewport: {
                    width: 1280,
                    height: 720
                }
            });
            console.log(`wsURL=${browser.wsEndpoint()} node ${path.basename(__filename)}`);
        
            const pages = await browser.pages();
            if (pages.length > 0) {
                page = pages[0];
            } else {
                page = await browser.newPage();
            }
            await page.goto(query.url);
            res.send("success");
        } catch(e) {
            next(e);
        }
    })();
    
});

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(8080);
console.log('view page by http://localhost:8080');
