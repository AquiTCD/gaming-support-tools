const i18nPosition = {
  head: '頭',
  body: '胴',
  arm: '腕',
  waist: '腰',
  leg: '脚',
}
const pathValue = (path:number|undefined) => {
  switch (true){
  case path === undefined:
    return '-'
  case path! > 0:
    return `[獣]${Math.abs(path!)}`
  case path! < 0:
    return `[人]${Math.abs(path!)}`
  default:
    return '-'
  }
}

export { i18nPosition, pathValue }
