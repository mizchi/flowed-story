/* @flow */
import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import glob from 'glob'
import flatten from 'lodash.flatten'
import * as builders from './builders'
import * as flowHelpers from './flowHelpers'
import typeAstToJson from './typeAstToJson'

const argv = require('minimist')(process.argv.slice(2))

const projectRoot = process.cwd()
const genDirPath = path.join(projectRoot, '.storybook/.gen')

const targetFilePaths = flatten(
  argv._.map(p => {
    const targetGlobExpr = path.join(projectRoot, p)
    return glob.sync(targetGlobExpr)
  })
).filter(fname => {
  return (
    fs
      .readFileSync(fname)
      .toString()
      .indexOf('@flow') > -1
  )
})
export function writeTempFile() {
  const tmpForFlow = builders.buildTempFile(targetFilePaths)

  const tmpFilePath = path.join(genDirPath, '_tmp.js')
  fs.writeFileSync(tmpFilePath, tmpForFlow)
  console.log('gen >', tmpFilePath.replace(projectRoot, '<project-root>'))

  // analysis
  const infos = builders.parseTmpSource(tmpForFlow)
  infos.forEach((info, index) => {
    // gen dummy
    try {
      const t = flowHelpers.getTypeAtPos(tmpFilePath, info.line, 1)
      const typeExpr = flowHelpers.parse('type T = ' + t.type).body[0].right

      let dummyProps

      // check {}
      if (typeExpr.params && typeExpr.params.length > 0) {
        const propsTypeAnnotation = typeExpr.params[0].typeAnnotation
        dummyProps = typeAstToJson(propsTypeAnnotation)
      } else {
        dummyProps = {}
      }

      // gen file
      const storyCode = builders.buildStoryCode(info.symbolFor, dummyProps)
      const base = path
        .basename(info.symbolFor)
        .replace(path.extname(info.symbolFor), '')
      const genPath = path.join(
        projectRoot,
        `.storybook/.gen/${index}_${base}.stories.js`
      )
      fs.writeFileSync(genPath, storyCode)
      console.log('gen >', genPath.replace(projectRoot, '<project-root>'))
    } catch (e) {
      console.error('fail >', genPath.replace(projectRoot, '<project-root>'))
      console.error(e)
    }
  })
}

mkdirp.sync(genDirPath)
rimraf.sync(path.join(process.cwd(), '.storybook/.gen/*.js'))
writeTempFile()
