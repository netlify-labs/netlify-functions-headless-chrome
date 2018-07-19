const faker = require('faker')

exports.handler = (event, context, callback) => {
  const name = faker.name.findName()
  console.log('name', name)
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
    	data: `hi ${name}`
    })
  })
}
