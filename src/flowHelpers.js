/* @flow */
const fs = require('fs')
const flow = require('flow-bin')
const parser = require('flow-parser-bin')
const { execFileSync } = require('child_process')

export function getTypeAtPos(fpath: string, line: number, column: number) {
  const ret = execFileSync(flow, [
    'type-at-pos',
    fpath,
    `${line}`,
    `${column}`,
    '--json'
  ]).toString()
  return JSON.parse(ret)
}

export function getExportDefaultType(fpath: string): string | null {
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
