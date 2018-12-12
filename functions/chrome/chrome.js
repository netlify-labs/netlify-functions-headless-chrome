const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

exports.handler = async (event, context, callback) => {
  let theTitle = null
  let browser = null
  console.log('spawning chrome headless')
  try {
  	const executablePath = await chromium.executablePath
  	console.log('executablePath', executablePath)
  	console.log('chromium.args', chromium.args)
  	console.log('chromium.headless', chromium.headless)
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: executablePath,
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
  	console.log('error', error)
    return callback(null, {
	    statusCode: 500,
	    body: JSON.stringify({
	      error: error
	    })
	  })
  } finally {
  	console.log('finally close', browser)
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