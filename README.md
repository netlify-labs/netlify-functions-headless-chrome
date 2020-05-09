# Netlify functions + Headless Chrome &nbsp;&nbsp;&nbsp;<a href="https://app.netlify.com/start/deploy?repository=https://github.com/netlify-labs/netlify-functions-headless-chrome"><img src="https://www.netlify.com/img/deploy/button.svg"></a>

> Run headless chrome in netlify lambda functions

## How

Add a [Netlify function](https://www.netlify.com/products/functions/) with the following code!

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./functions/chrome/chrome.js) -->
<!-- The below code snippet is automatically added from ./functions/chrome/chrome.js -->
```js
const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

exports.handler = async (event, context, callback) => {
  let theTitle = null
  let browser = null
  console.log('spawning chrome headless')
  try {
    const executablePath = await chromium.executablePath

    // setup
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: executablePath,
      headless: chromium.headless,
    })

    // Do stuff with headless chrome
    const page = await browser.newPage()
    const targetUrl = 'https://davidwells.io'

    // Goto page and then do stuff
    await page.goto(targetUrl, {
      waitUntil: ["domcontentloaded", "networkidle0"]
    })

    await page.waitForSelector('#___gatsby')

    theTitle = await page.title();

    console.log('done on page', theTitle)

  } catch (error) {
    console.log('error', error)
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        error: error
      })
    })
  } finally {
    // close browser
    if (browser !== null) {
      await browser.close()
    }
  }

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      title: theTitle,
    })
  })
}
```
<!-- AUTO-GENERATED-CONTENT:END -->
