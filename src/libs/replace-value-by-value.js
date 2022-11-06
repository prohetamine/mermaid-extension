const replaceValueByValue = (value, value2, object) => {
  return Object.keys(object).reduce((ctx, _key) => {
    if (object[_key].match && object[_key].match(value)) {
      ctx[_key] = object[_key].replace(value, value2)
      return ctx
    } else {
      if (object[_key] instanceof Object && typeof(object[_key]) === 'object') {
        ctx[_key] = replaceValueByValue(value, value2, object[_key])
        return ctx
      } else {
        ctx = { ...object, ...ctx }
        return ctx
      }
    }
  }, {})
}
