#!/usr/bin/env node

console.log('>>>')
const fs = require('fs')
const glob = require('glob')

const files = glob.sync('./build/*/*.zip')

files.map(async file => {
  console.log('file>>>>')
  const path = file.split('/')
  console.log('path',path)
  const name = path.pop().split('.zip').shift()
  const target = path.pop()
  const newFile = `./build/${name}_${target}.zip`

  if(fs.existsSync(newFile))fs.unlinkSync(newFile)

  //rename artifact
  console.log(`${file} → ${newFile}`)
  fs.renameSync(file,newFile)

  //remove empty dir
  fs.rmdirSync(`./build/${target}`,{recursive:true})

})