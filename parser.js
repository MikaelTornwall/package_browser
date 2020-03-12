const parseToBlocks = (data) => {
    data = data.split('\n\n')
    return data
}

const initializeObject = (blocks) => {
  const obj = new Object()

  for (block of blocks) {
    if (!block.trim()) continue;

    block = block.split('\n')
    let package = block[0].replace('Package: ', '')
    package = package.trim().toString()

    obj[package] = {
      name: package,
      dependencies: [],
      dependents: []
    }
  }
  return obj
}

const parseToObject = (blocks) => {
  const obj = initializeObject(blocks)

  // for (block of blocks) {
  //
  //   if (!block.trim()) continue;
  //
  //   block = block.split('\n')
  //   let package = block[0].replace('Package: ', '')
  //   package = package.trim().toString()
  //
  //   obj[package] = {
  //     name: package,
  //     dependencies: [],
  //     dependents: []
  //   }
  //
  //   for (let i = 1; i < block.length; i++) {
  //     line = block[i]
  //
  //     if (line.startsWith('Depends: ')) {
  //       line = line.split(',')
  //       for (dep of line) {
  //
  //       }
  //     }
  //   }
  //
  //
  // }
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
