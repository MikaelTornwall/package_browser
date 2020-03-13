const packageRouter =   require('express').Router()
const fileReader =      require('../readFile')
const parser =          require('../parser')

packageRouter.get('/', async (req, res) => {
  try {
    const res = await fileReader.readFile('status')
    const blocks = await parser.parseToBlocks(res)
    const obj = await parser.parseToObject(blocks)
    const json = JSON.stringify(obj)
    
  } catch(err) {
    throw err
  }
})

module.exports = packageRouter
