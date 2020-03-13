const express =           require('express')
const app =               express()
const cors =              require('cors')
const packageRouter =     require('./controllers/packages')
const packageService =    require('./services/packagesService')

packageService.initPackages()

app.use(cors())
app.use('/api/packages', packageRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
