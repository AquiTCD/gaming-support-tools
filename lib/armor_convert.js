import * as fs from 'fs';
import csv from 'csvtojson'

const inputFile = './lib/wildhearts_armor_list.csv';
const outputFile = './src/assets/wildhearts/armor_list.json';

const columns = {
  'id': 'id',
  '名称': 'name',
  '部位': 'position',
  '人|獣': 'path',
  '防御': 'defence',
  '木耐性': 'woodResilience',
  '火耐性': 'fireResilience',
  '水耐性': 'waterResilience',
  '風耐性': 'windResilience',
  '土耐性': 'earthResilience',
  '技能1': 'skills.0',
  '技能2': 'skills.1',
  '技能3': 'skills.2',
  '素材': 'materials',
}

csv({
  headers: Object.values(columns),
  colParser:{
    'id': 'number',
    'path': 'number',
    'defence': 'number',
    'woodResilience': 'number',
    'fireResilience': 'number',
    'waterResilience': 'number',
    'windResilience': 'number',
    'earthResilience': 'number'
  },
  ignoreEmpty: true,
})
.fromFile(inputFile)
.then((jsonObj)=>{
  try {
    fs.writeFileSync(outputFile, JSON.stringify(jsonObj));
    console.log('complete!');
  }catch(e){
    console.log(e);
  }
})
