export type Select = {
  order: number,
  coord: string, // '1D'
  skills: {id: string, name: string}[],  // ['1D-0', '1D-1']
}
export const coordinates = [
                       '1D',                              '1I',                              '1N',
  // '2A',  '2B',  '2C',  '2D',  '2E',  '2F',  '2G',  '2H',  '2I',  '2J',  '2K',  '2L',  '2M',  '2N',  '2O',  '2P',  '1Q',
                                                   '3H',  '3I',  '3J',
  '4A',         '4C',         '4E',         '4G',  '4H',         '4J',  '4K',         '4M',         '4O',         '4Q',
  '5A',                                     '5G',  '5H',         '5J',  '5K',         '5M',         '5O',
  '6A',         '6C',  '6D',  '6E',         '6G',  '6H',         '6J',  '6K',         '6M',  '6N',  '6O',         '6Q',
  // '7A', '7B', '7C', '7D', '7E', '7F', '7G', '7H', '7I', '7J', '7K', '7L', '7M', '7N', '7O', '7P', '1Q',
         '8B',         '8D',         '8F',                '8I',                '8L',         '8N',         '8P',
  '9A',         '9C',         '9E',         '9G', '9H',          '9J',  '9K',         '9M',         '9O',         '9Q',
                              '10E',        '10G', '10H',               '10K',                                    '10Q',
                '11C',        '11E',        '11G', '11H',        '11J', '11K',                      '11O',        '11Q',
  '12A',        '12C',        '12E',        '12G', '12H',        '12J', '12K',        '12M',        '12O',        '12Q',
         '13B',                      '13F',               '13I',               '13L',                      '13P',
  '14A', '14B',                      '14F',               '14I',               '14L',                      '14P',
  // '15A', '15B', '15C', '15D', '15E', '15F', '15G', '15H', '15I', '15J', '15K', '15L', '15M', '15N', '15O', '15P', '15Q',
                              '16E',                                                  '16M',
] as const

export type Coordinate = typeof coordinates[number]

export type InheritedSkill = {
  id: string,
  name: string,
}

export type Weapon = {
  coord: Coordinate,
  name: string,
  charac: '斬撃' | '殴打' | '刺突',
  attack: number,
  critical: number,
  attribute: '樹' | '火' | '水' | '風' | '土' | '',
  attributePower: number,
  inherentSkills: string[],
  inheritedSkills: InheritedSkill[],
  capacity: number,
}
