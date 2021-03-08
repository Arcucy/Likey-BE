/**
 * iota 方法返回一个 int，每次调用后会自增。
 * 如果需要创建一个新的枚举，请使用 initIota 方法重新赋值。
 */
function initIota() {
  let iotaIndex = 0
  return () => {
    return iotaIndex++
  }
}
let iota = null

// 请在每个新的枚举前将 iota 重新初始化
iota = initIota()
/** 平台类型 */
const platformType = {
  /** 0. arweave 钱包 */
  arweave: iota(),
}

module.exports = {
  platformType,
}
