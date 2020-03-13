const http =            require('http')
const fileReader =      require('./readFile')
const parser =          require('./parser')

const init = async () => {
  const res = await fileReader.readFile('status')
  const blocks = await parser.parseToBlocks(res)
  const obj = await parser.parseToObject(blocks)
  return res
}

init()

const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello, World')
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
