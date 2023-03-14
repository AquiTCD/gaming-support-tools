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

const skillColorClass = (skill: string):string => {
  switch (true) {
    case skill.startsWith('[活人皆伝]'):
      return "text-pure-human"
    case skill.startsWith('[活人]'):
      return "text-human"
    case skill.startsWith('[獣道]'):
      return "text-kemono"
    case skill.startsWith('[獣道皆伝]'):
      return "text-pure-kemono"
    default:
      return ""
  }
}

export { i18nPosition, pathValue, skillColorClass }
