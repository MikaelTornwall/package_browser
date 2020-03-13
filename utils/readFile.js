const fs =          require('fs')
const readline =    require('readline')
const parser =      require('./parser')

const checkLine = (line) => {
  const keys = ['Package: ', 'Depends: ', 'Description: ', ' ']
  if (line.startsWith(keys[0]) || line.startsWith(keys[1]) || line.startsWith(keys[2])
  || line.startsWith(keys[3]) || line.length == 0) return true

  return false
}

const readFile = (path) => {
  return new Promise((res, rej) => {
    try {
      let text = ''
      const readInterface = readline.createInterface({
        input: fs.createReadStream(path),
        terminal: false
      })
      readInterface.on('line', function(line) {
        if (checkLine(line)) text += line + '\n'
      }).on('close', function() {
        res(text)
      })
    } catch (err) {
      rej(err)
    }
  })
}

module.exports = { readFile }
