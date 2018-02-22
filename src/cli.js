/* @flow */
import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import glob from 'glob'
import flatten from 'lodash.flatten'
import * as builders from './builders'
import * as flowHelpers from './flowHelpers'
import typeAstToJson from './typeAstToJson'

const projectRoot = process.cwd()

const targetGlobExpr = path.join(projectRoot, process.argv[2])
const targetFilePaths = glob.sync(targetGlobExpr)

export function writeTempFile() {
  const tmpForFlow = builders.buildTempFile(targetFilePaths)

  const genDirPath = path.join(projectRoot, '.storybook/.gen')
  mkdirp.sync(genDirPath)
  const tmpFilePath = path.join(genDirPath, '_tmp.js')
  fs.writeFileSync(tmpFilePath, tmpForFlow)
  console.log('gen >', tmpFilePath.replace(projectRoot, '<project-root>'))

  // analysis
  const infos = builders.parseTmpSource(tmpForFlow)
  infos.forEach((info, index) => {
    // gen dummy
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
    const genPath = path.join(
      projectRoot,
      `.storybook/.gen/${index}.stories.js`
    )
    fs.writeFileSync(genPath, storyCode)
    console.log('gen >', genPath.replace(projectRoot, '<project-root>'))
  })
}

writeTempFile()
