const fs =          require('fs')
const readline =    require('readline')
const parser =      require('./parser')

const readFile = (filePath) => {
  return new Promise((res, rej) => {
    try {
      fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) throw err
          return res(data)
      })
    } catch(err) {
      rej(err)
    }
  })
}

// const readFile = (path) => {
//   return new Promise((res, rej) => {
//     try {
//       let text = ''
//       const readInterface = readline.createInterface({
//         input: fs.createReadStream(path),
//         terminal: false
//       })
//
//       readInterface.on('line', function(line) {
//         line = line.trim()
//         parser.parse(line)
//         text += line + "\n"
//       }).on('close', function() {
//         const obj = parser.getObj()
//         res(obj)
//       })
//     } catch (err) {
//       rej(err)
//     }
//   })
// }
//
// const blockData = (data) => {
//   obj = {}
//   dataArray = data.toString().split('\n\n')
//   console.log(dataArray[0])
//   // dataArray.map(line => console.log(line + '\n'))
// }

// One option

// const readFile = (filePath) => {
//   fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) throw err
//
//   })
// }

module.exports = { readFile }
