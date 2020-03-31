const parseToBlocks = (data) => {
    data = data.split('\n\n')
    data.pop()
    return data
}

const extractPackage = (line) => {
  const key = 'Package: '
  let package = line.replace(key, '')
  package = package.trim()
  return package
}

const extractDependencies = (line, obj) => {
  const dependencies = []
  const matchDepends = 'Depends: '
  const matchBrackets = /\((.*?)\)/g
  const matchPipe = /\|(.*)/g
  line = line
    .replace(matchDepends, '')
    .split(',')
    .map(dependency => dependency
      .replace(matchBrackets, '')
      .replace(matchPipe, '')
      .trim())
  line = [... new Set(line)]
  dependencies.push(line.filter(dependency => obj[dependency]))
  dependencies.push(line.filter(dependency => !obj[dependency]))
  return dependencies
}

const extractDescription = (line) => {
  const re = 'Description: '
  line = line.replace(re, '')
  return line
}

const initializeObject = (blocks) => {
  const obj = {}
  let index = 1

  blocks.forEach(block => {
    block = block.split('\n')
    const package = extractPackage(block[0])
    obj[package] = {
      index: index++,
      name: package,
      description: '',
      dependencies: [[], []],
      dependents: []
    }
  })
  return obj
}

const parseToObject = (res) => {
  const blocks = parseToBlocks(res)
  const obj = initializeObject(blocks)
  const keys = ['Depends: ', 'Description: ', ' ']

  blocks.forEach(block => {
    block = block.split('\n')
    const package = extractPackage(block[0])
    block.map(line => {
      if (line.startsWith(keys[0])) {
        line = extractDependencies(line, obj)
        obj[package].dependencies = line
        line[0].forEach(dependency => {
          obj[dependency].dependents.push(package)
        })
      } else if (line.startsWith(keys[1])) {
        obj[package].description = extractDescription(line)
      } else if (line.startsWith(keys[2])) {
        obj[package].description += line
      }
    })
  })
  return obj
}

module.exports = { parseToBlocks, parseToObject }
