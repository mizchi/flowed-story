/* @flow */
export default function astToObject(node, nodePath = 'props') {
  switch (node.type) {
    case 'ObjectTypeAnnotation': {
      return node.properties.reduce((acc, property) => {
        // TODO: Check key is optional
        const nextPath = nodePath + '.' + property.key.name
        return {
          ...acc,
          [property.key.name]: astToObject(property.value, nextPath)
        }
      }, {})
    }
    case 'GenericTypeAnnotation': {
      if (node.id.name === 'Array') {
        const nextPath = nodePath + '.*'
        return [astToObject(node.typeParameters.params[0], nextPath)]
      } else {
        // TODO: Trace type instance
        return null
      }
    }
    case 'NumberTypeAnnotation': {
      return 42
    }
    case 'StringTypeAnnotation': {
      return `<string: ${nodePath}>`
    }
    case 'AnyTypeAnnotation': {
      return `<any: ${nodePath}>`
    }
    default: {
      console.error('missing:', node.type)
      return null
    }
  }
}

export const dumpAst = obj => console.log(JSON.stringify(obj, null, 2))
