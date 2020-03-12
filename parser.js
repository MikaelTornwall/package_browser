const parseToBlocks = (data) => {
    data = data.split('\n\n')
    return data
}

const parseToObject = (blocks) => {
  const obj = new Object()

  for (block of blocks) {
    block = block.split('\n')

    for (line of block) {
      if (line.startsWith('Package:')) {
        line = line.replace('Package: ', '')
        obj[line] = {}
      }
    }
  }
  console.log(obj)
}

const parse = (line) => {
  if (line.startsWith('Package:')) {
    line = line.split(':')
    // console.log(line[1].trim())
    package = line[1]
    obj.line[1] = {}
  }
}

module.exports = { parse, parseToBlocks, parseToObject }
