/* @flow */
import { astToObject, buildTempFile } from './builders'
import { getTypeAtPos, getExportDefaultType } from './flowHelpers'
const debug = obj => console.log(JSON.stringify(obj, null, 2))

export function generateTempForFlowAnalysis(targetGlobExpr: string) {
  return buildTempFile([targetGlobExpr])
}

export function generateScenario() {
  const ast = parser.parse(buf)
  const exportDefaultNode = ast.body.find(
    node => node.type === 'ExportDefaultDeclaration'
  )

  const targetPath = path.join(__dirname, '../src/components/App.js')
  const typeExprString = getExportDefaultType(targetPath)
  if (typeExprString) {
    const typeExpr = parser.parse('type T = ' + typeExprString).body[0].right
    // debug(astToObject(typeExpr.params[0].typeAnnotation))
    const props = astToObject(typeExpr.params[0].typeAnnotation)
    const ret = template(targetPath, props)
    console.log(ret) // write file to .storybook/.gen
  }
}
