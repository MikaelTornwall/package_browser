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

const extractDependencies = (line) => {
  const re1 = 'Depends: '
  const re2 = /\((.*?)\)/g
  const re3 = /\|(.*)/g
  line = line.replace(re1, '')
    .replace(re2, '')
    .replace(re3, '')
    .split(',')
    .map(d => d.trim())
  return line
}

const extractDescription = (line) => {
  const re = 'Description: '
  line = line.replace(re, '')
  return line
}

const initializeObject = (blocks) => {
  const obj = new Object()
  let index = 1

  blocks.forEach(block => {
    block = block.split('\n')
    const package = extractPackage(block[0])
    obj[package] = { index: index++, name: package, description: '', dependencies: [], dependents: [] }
  })

  return obj
}

const parseToObject = (blocks) => {
  const obj = initializeObject(blocks)
  const keys = ['Depends: ', 'Description: ', ' ']

  blocks.forEach(block => {
    block = block.split('\n')
    const package = extractPackage(block[0])
    block.map(line => {
      if (line.startsWith(keys[0])) {
        line = extractDependencies(line)
        obj[package].dependencies = line
        line.forEach(dependency => {
          if (!obj[dependency]) return
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
