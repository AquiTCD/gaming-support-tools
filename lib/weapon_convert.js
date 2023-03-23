import * as fs from 'fs';
import csv from 'csvtojson'

const inputFile = './lib/wildhearts_weapon_list_katana.csv';
const outputFile = './src/assets/wildhearts/katana_list.json';

const columns = {
  '座標': 'coord',
  '名称': 'name',
  '物理属性': 'charac',
  '攻撃力': 'attack',
  '属性': 'attribute',
  '属性攻撃力': 'attributePower',
  '会心率': 'critical',
  '固有技能1': 'inherentSkills.0',
  '固有技能2': 'inherentSkills.1',
  '固有技能3': 'inherentSkills.2',
  '空枠数': 'capacity',
  '継承技能1': 'inheritedSkills.0',
  '継承技能2': 'inheritedSkills.1',
  '継承技能3': 'inheritedSkills.2',
  '必要金': 'gold',
  '必要素材1名称': 'materials.0.name',
  '必要素材1数': 'materials.0.count',
  '必要素材2名称': 'materials.1.name',
  '必要素材2数': 'materials.1.count',
  '必要素材3名称': 'materials.2.name',
  '必要素材3数': 'materials.2.count',
  '必要素材4名称': 'materials.3.name',
  '必要素材4数': 'materials.3.count',
}

csv({
  headers: Object.values(columns),
  ignoreEmpty: true,
  colParser:{
    'attack': 'number',
    'attributePower': 'number',
    'critical': 'number',
    'capacity': 'number',
    'gold': 'number',
    'materials.0.count': 'number',
    'materials.1.count': 'number',
    'materials.2.count': 'number',
    'materials.3.count': 'number',
    'inheritedSkills.0': (item, head, resultRow, row , colIdx) => {
      return item ? { id: `${row[0]}-${head.slice(-1)}`, name: item } : ""
    },
    'inheritedSkills.1': (item, head, resultRow, row , colIdx) => {
      return item ? { id: `${row[0]}-${head.slice(-1)}`, name: item } : ""
    },
    'inheritedSkills.2': (item, head, resultRow, row , colIdx) => {
      return item ? { id: `${row[0]}-${head.slice(-1)}`, name: item } : ""
    }
    //  {id: '4O-0', name: 'カレー曜日' }
  },
})
.fromFile(inputFile)
.then((jsonObj)=>{
  try {
    jsonObj.map(o => {
      o.attribute = o.attribute ?? ""
      o.inherentSkills = o.inherentSkills ?? []
      o.inheritedSkills = o.inheritedSkills ?? []
      return o
    })
    fs.writeFileSync(outputFile, JSON.stringify(jsonObj));
    console.log('complete!');
  }catch(e){
    console.log(e);
  }
})