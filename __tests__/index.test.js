const { constants, accessSync, appendFileSync, existsSync, mkdirSync, readFileSync, rmdirSync, writeFileSync } = require('../')

function getScriptFolder(context) {
  const parts = context.scriptPath.split('/')
  parts.pop()
  return parts.join('/')
}

test('should return true if file exists', (context) => {
  expect(existsSync(getScriptFolder(context) + '/manifest.json')).toBe(true)
})

test('should return false if file do not exists', (context) => {
  expect(existsSync(getScriptFolder(context) + '/manifest.jsonaoigwhdoiagw')).toBe(false)
})

test('should return the access of a file', (context) => {
  const file = getScriptFolder(context) + '/manifest.json'
  expect(accessSync(file)).toBe(undefined) // exists
  try {
    accessSync(file, constants.X_OK) // executable
    expect(true).toBe(false)
  } catch (err) {
    expect(true).toBe(true)
  }
  expect(accessSync(file, constants.W_OK)).toBe(undefined) // writable
  expect(accessSync(file, constants.R_OK)).toBe(undefined) // readable
})

test('should create a directory', (context) => {
  expect(mkdirSync(getScriptFolder(context) + '/test')).toBe(undefined)
})

test('should create a file', (context) => {
  expect(writeFileSync(getScriptFolder(context) + '/test/test.txt', 'test')).toBe(undefined)
})

test('should append to a file', (context) => {
  expect(appendFileSync(getScriptFolder(context) + '/test/test.txt', 'test')).toBe(undefined)
})

test('should read a file', (context) => {
  expect(readFileSync(getScriptFolder(context) + '/test/test.txt', 'utf8')).toBe('testtest')
})

test('should throw an error when trying to create a directory when its parent does not exist', () => {
  try {
    mkdirSync(getScriptFolder(context) + '/test/a/b')
    expect(false).toBe(true)
  } catch(err) {
    expect(err).not.toBe(undefined)
  }
})

test('should remove a directory', () => {
  expect(rmdirSync(getScriptFolder(context) + '/test')).toBe(undefined)
})
