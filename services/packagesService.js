const fileReader =      require('../utils/readFile')
const parser =          require('../utils/parser')

let packages = null
let keys = null
let path = './var/lib/dpkg/status'

const initPackages = async () => {
  try {
    if (!packages || !keys) {
      const res = await fileReader.readFile(path)
      const blocks = await parser.parseToBlocks(res)
      packages = await parser.parseToObject(blocks)
      keys = Object.keys(packages)
      keys.sort()
    }
  } catch(err) {
    console.log(err)
  }
}

const getPackages = () => keys

const getByName = (name) => packages[name]

module.exports = { initPackages, getPackages, getByName }
