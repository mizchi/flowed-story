/* @flow */
import path from 'path'
import * as commands from './commands'

// WIP: generateTempForFlowAnalysis
const targetGlobExpr = path.join(process.cwd(), process.argv[2])
const temp = commands.generateTempForFlowAnalysis(targetGlobExpr)
console.log(temp)
