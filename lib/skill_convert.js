import * as fs from 'fs';
import csv from 'csvtojson'

const inputFile = './lib/wildhearts_skill_list.csv';
const outputFile = './src/assets/wildhearts/skill_list.json';

const columns = {
  'id': 'id',
  '名称': 'name',
  '説明': 'description',
  'かな': 'kana'
}

csv({
  headers: Object.values(columns),
  colParser:{
    'id': 'number',
    'name': 'string',
    'description': 'string',
    'kana': 'string'
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
