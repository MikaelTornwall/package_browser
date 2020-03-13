const packageRouter =   require('express').Router()
const fileReader =      require('../utils/readFile')
const parser =          require('../utils/parser')

packageRouter.get('/:id', async (req, res) => {
  try {
    const res = await fileReader.readFile('../status')
    const blocks = await parser.parseToBlocks(res)
    const obj = await parser.parseToObject(blocks)
    console.log(obj)
    res
  } catch(err) {
    throw err
  }
})

module.exports = packageRouter
