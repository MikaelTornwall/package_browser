const packageRouter =     require('express').Router()
const packagesService =   require('../services/packagesService')

packageRouter.get('/', (req, res) => {
  try {
    const packages = packagesService.getPackages()
    res.send(packages)
  } catch(err) {
    console.log(err)
  }
})

packageRouter.get('/:name', (req, res) => {
  try {
    const name = req.params.name
    const package = packagesService.getByName(name)    
    res.send(package)
  } catch(err) {
    console.log(err)
  }
})

module.exports = packageRouter
