const packageRouter =     require('express').Router()
const packagesService =   require('../services/packagesService')
const logger =            require('../utils/logger')

packageRouter.get('/', (req, res) => {
  try {
    const packages = packagesService.getPackages()
    res.send(packages)
  } catch(err) {
    logger.error(err)
  }
})

packageRouter.get('/:name', (req, res) => {
  try {
    const name = req.params.name
    const package = packagesService.getByName(name)
    res.send(package)
  } catch(err) {
    logger.error(err)
  }
})

module.exports = packageRouter
