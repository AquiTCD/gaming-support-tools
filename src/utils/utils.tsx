export const i18nPosition = {
  head: '頭',
  body: '胴',
  arm: '腕',
  waist: '腰',
  leg: '脚',
}
export const pathValue = (path:number|undefined) => {
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

export const skillColorClass = (skill: string):string => {
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

export const skillName = (skill: string):string => {
  return skill.replace(/\s\+?\d+%?$/, '')
}

const columns = 'ABCDEFGHIJKLMNOPQ'
const maxRow = 17
export const location: { [key: string]: {x: number, y:number} } = {}
for(let row:number = 1; row <= maxRow; row++)  {
  for(let column:number = 1; column <= columns.length; column++) {
    location[`${String(row)}${columns.charAt(column - 1)}`] = {
      x: column * 60 - 20,
      y: row * 60 - 20,
    }
  }
}
