/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  const {rootValue = 16, unitPrecision = 2} = opts;

  /**
   * @param {number} px
   */
  const pxToRem = (px) => {
    return (px / rootValue).toFixed(unitPrecision)
  }

  // Work with options here
  const replaceRemFunctionToPx = (value) => {
    return value.replace(/\$rem\((\d*)\)/g, (match, offset) => (pxToRem(offset)) + 'rem')
  }

  return {
    postcssPlugin: 'px-to-rem-postcss',

    Declaration (decl) {
      if (decl.value.includes('$rem')) {
        decl.value = replaceRemFunctionToPx(decl.value)
      }
    }
  }
}

module.exports.postcss = true
