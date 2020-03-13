const fileReader =      require('../utils/readFile')
const parser =          require('../utils/parser')

let packages = null
let keys = null
let path = './status'

const initPackages = async () => {
  if (!packages || !keys) {
    const res = await fileReader.readFile(path)
    const blocks = await parser.parseToBlocks(res)
    packages = await parser.parseToObject(blocks)
    keys = Object.keys(packages)
    keys.sort()
  }
}

const getPackages = () => keys

const getByName = (name) => packages[name]

module.exports = { initPackages, getPackages, getByName }
