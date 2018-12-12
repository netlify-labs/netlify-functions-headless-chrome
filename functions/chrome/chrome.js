const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

exports.handler = async (event, context, callback) => {
  let theTitle = null
  let browser = null
  console.log('working')
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    })

    console.log('browser', browser)

    let page = await browser.newPage()
    const targetUrl = 'https://davidwells.io'

	  await page.goto(targetUrl, {
	    waitUntil: ["domcontentloaded", "networkidle0"]
	  })

	  await page.waitForSelector('#phenomic')

	  theTitle = await page.title();

	  console.log('done on page', theTitle)

  } catch (error) {
    return callback(null, {
	    statusCode: 500,
	    body: JSON.stringify({
	      title: error
	    })
	  })
  } finally {
    if (browser !== null) {
      await browser.close()
    }
  }

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      title: theTitle,
      what: 'hi'
    })
  })
}