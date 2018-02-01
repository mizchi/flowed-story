/* @flow */
const fs = require('fs')
const { execFileSync } = require('child_process')
const flow = require('flow-bin')
const parser = require('flow-parser-bin')
const debug = obj => console.log(JSON.stringify(obj, null, 2))

function getTypeAtPos(fpath: string, line: number, column: number) {
  const ret = execFileSync(flow, [
    'type-at-pos',
    fpath,
    `${line}`,
    `${column}`,
    '--json'
  ]).toString()
  return JSON.parse(ret)
}

function getExportDefaultType(fpath: string): string | null {
  const body = fs.readFileSync(fpath).toString()
  const ast = parser.parse(body)
  const exportDefaultNode = ast.body.find(
    node => node.type === 'ExportDefaultDeclaration'
  )

  if (exportDefaultNode) {
    const start = exportDefaultNode.declaration.loc.start
    const { type } = getTypeAtPos(fpath, start.line, start.column + 1)
    return type
  }
  return null
}

function astToObject(node) {
  switch (node.type) {
    case 'ObjectTypeAnnotation': {
      return node.properties.reduce((acc, property) => {
        // TODO: Check key is optional
        return { ...acc, [property.key.name]: astToObject(property.value) }
      }, {})
    }
    case 'GenericTypeAnnotation': {
      if (node.id.name === 'Array') {
        return [astToObject(node.typeParameters.params[0])]
      } else {
        // TODO: Trace type instance
        return {}
      }
    }
    case 'NumberTypeAnnotation': {
      return 42
    }
    case 'StringTypeAnnotation': {
      return '<string>'
    }
    case 'AnyTypeAnnotation': {
      return '<any>'
    }
    default: {
      console.log('missing:', node.type)
      return null
    }
  }
}

const typeExprString = getExportDefaultType('index.js')
if (typeExprString) {
  const typeExpr = parser.parse('type T = ' + typeExprString).body[0].right
  debug(astToObject(typeExpr))
}
