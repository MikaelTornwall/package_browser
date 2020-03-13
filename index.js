const express =         require('express')
const app =             express()
const fileReader =      require('./utils/readFile')
const parser =          require('./utils/parser')
const packageRouter =   require('./controllers/packages')

const init = async () => {
  const res = await fileReader.readFile('status')
  const blocks = await parser.parseToBlocks(res)
  const obj = await parser.parseToObject(blocks)
  console.log(obj)
  return res
}

init()

app.use('/api/packages', packageRouter)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
