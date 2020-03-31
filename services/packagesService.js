const fileReader =      require('../utils/readFile')
const parser =          require('../utils/parser')
const logger =          require('../utils/logger')

let packages = null
let keys = null
let path = './var/lib/dpkg/status'

const initPackages = async () => {
  try {
    if (!packages || !keys) {
      const res = await fileReader.readFile(path)
      packages = await parser.parseToObject(res)
      keys = Object.keys(packages)
      keys.sort()
    }
  } catch(err) {
    logger.error(err)
  }
}

const getPackages = () => keys

const getByName = (name) => packages[name]

module.exports = { initPackages, getPackages, getByName }
