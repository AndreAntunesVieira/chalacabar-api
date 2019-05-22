const fs = require('fs-extra')
const uglifyJS = require('uglify-js-es6')

const processExec = require('child_process').exec
const exec = command =>
  new Promise((resolve, reject) =>
    processExec(command, (err, content) =>
      err ? reject(err) : resolve(content)
    )
  )

exec('rm -rf dist && mkdir dist')
  .then(() => exec('npx babel src --out-dir dist'))
  .then(() => exec('npx babel server.js --out-file dist/server.js'))
  .then(compileServer)
  .then(compileBaseModel)
  .then(adjustAllFiles)
  .then(() => exec('cp .env.sample dist/.env'))
  .then(() => exec('cp bin/dotenv-generator.js dist/'))
  .then(() => exec('cp package.json dist/package.json'))
  .then(() => console.log('foi'))

function compileServer() {
  return fs
    .readFile('dist/server.js', 'utf8')
    .then(content => content.replace(/\/src\//g, '/'))
    .then(content => fs.writeFile('dist/server.js', content))
}

function compileBaseModel() {
  return fs
    .readFile('dist/models/_BaseModel.js', 'utf8')
    .then(content =>
      content
        .replace('\nvar connected = false;', '')
        .replace('\nvar connection;', '')
        .replace(
          '  function BaseModel()',
          '  let connected = false;\n  let connection;\n  function BaseModel()'
        )
    )
    .then(content => fs.writeFile('dist/models/_BaseModel.js', content))
}

function compileVarToConst(file) {
  return fs
    .readFile(file, 'utf8')
    .then(content => content.replace(/(\n| )var( .* = )/g, '$1const$2'))
    .then(content => content.replace(/(\n| )var /g, '$1let '))
    .then(content => fs.writeFile(file, content))
}

function adjustAllFiles() {
  return getAllFiles()
    .then(files => files.map(compileVarToConst))
    .then(files => Promise.all(files))
}

function getAllFiles() {
  return fs.readdir('dist').then(paths => {
    const files = paths.filter(f => f.match(/\.js$/)).map(f => `dist/${f}`)
    const folders = paths.filter(f => !f.match(/\.js$/))
    const subFilesPromises = folders.map(folder =>
      fs
        .readdir(`dist/${folder}`)
        .then(subFiles => subFiles.map(file => `dist/${folder}/${file}`))
    )
    return Promise.all(subFilesPromises).then(subFiles => [
      ...files,
      ...subFiles[0],
      ...subFiles[1],
      ...subFiles[2],
    ])
  })
}
