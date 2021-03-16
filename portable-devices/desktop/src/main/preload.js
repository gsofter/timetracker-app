var _require = require("esm")(module)
console.log('----PRELOAD____CALLLED')
process.once('loaded', () => {
  global.require = _require
})