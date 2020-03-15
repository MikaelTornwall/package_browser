const express =           require('express')
const app =               express()
const cors =              require('cors')
const packageRouter =     require('./controllers/packages')
const packageService =    require('./services/packagesService')
const logger =            require('./utils/logger')

try {
  packageService.initPackages()
} catch(err) {
  logger.error(err)
}

app.use(cors())
app.use(express.static('build'))
app.use('/api/packages', packageRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
