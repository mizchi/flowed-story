/* @flow */
export default function astToObject(node) {
  switch (node.type) {
    case 'ObjectTypeAnnotation': {
      return node.properties.reduce((acc, property) => {
        // TODO: Check key is optional
        return { ...acc, [property.key.name]: astToObject(property.value) }
      })
    }
    case 'GenericTypeAnnotation': {
      if (node.id.name === 'Array') {
        return [astToObject(node.typeParameters.params[0])]
      } else {
        // TODO: Trace type instance
        return null
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
      console.error('missing:', node.type)
      return null
    }
  }
}

export const dumpAst = obj => console.log(JSON.stringify(obj, null, 2))
