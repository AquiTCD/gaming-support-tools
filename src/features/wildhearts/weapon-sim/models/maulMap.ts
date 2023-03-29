export const maulCoordinates = [
                       '1D',                              '1I',                              '1N',
  // '2A',  '2B',  '2C',  '2D',  '2E',  '2F',  '2G',  '2H',  '2I',  '2J',  '2K',  '2L',  '2M',  '2N',  '2O',  '2P',  '1Q',
                                                   '3H',  '3I',  '3J',
  '4A',         '4C',         '4E',         '4G',  '4H',         '4J',  '4K',         '4M',         '4O',         '4Q',
  '5A',                                     '5G',  '5H',         '5J',  '5K',         '5M',                       '5Q',
  '6A',         '6C',  '6D',  '6E',         '6G',  '6H',         '6J',  '6K',         '6M',  '6N',  '6O',         '6Q',
  // '7A', '7B', '7C', '7D', '7E', '7F', '7G', '7H', '7I', '7J', '7K', '7L', '7M', '7N', '7O', '7P', '1Q',
         '8B',         '8D',         '8F',                '8I',                '8L',         '8N',         '8P',
  '9A',         '9C',         '9E',         '9G', '9H',          '9J',  '9K',         '9M',         '9O',         '9Q',
                '10C',        '10E',        '10G', '10H',        '10J', '10K',                      '10O',        '10Q',
                              '11E',        '11G', '11H',        '11J', '11K',                                    '11Q',
  '12A',        '12C',        '12E',        '12G', '12H',        '12J', '12K',        '12M',        '12O',        '12Q',
         '13B',                      '13F',               '13I',               '13L',                      '13P',
  '14A', '14B',                      '14F',               '14I',               '14L',                      '14P',
  // '15A', '15B', '15C', '15D', '15E', '15F', '15G', '15H', '15I', '15J', '15K', '15L', '15M', '15N', '15O', '15P', '15Q',
                              '16E',                                                  '16M',
         '17B',                                                                '17L',
] as const
export type MaulCoordinate = typeof maulCoordinates[number]
export type MaulPath = [MaulCoordinate, MaulCoordinate]
export const maulPaths: MaulPath[] = [
  ['1D', '4A'],
  ['1D', '4C'],
  ['1D', '6D'],
  ['1D', '4E'],
  ['1D', '4G'],
  ['1D', '1I'],
  ['1I', '3I'],
  ['1I', '3J'],
  ['1I', '1N'],
  ['1N', '4K'],
  ['1N', '4M'],
  ['1N', '6N'],
  ['1N', '4O'],
  ['1N', '4Q'],

  ['3H', '4H'],
  ['3H', '3I'],
  ['3I', '3J'],
  ['3J', '4J'],

  ['4A', '5A'],
  ['4C', '6A'],
  ['4C', '6C'],
  ['4E', '6E'],
  ['4E', '6G'],
  ['4G', '5G'],
  ['4G', '4H'],
  ['4H', '5H'],
  ['4H', '4J'],
  ['4J', '5J'],
  ['4K', '5K'],
  ['4K', '5M'],
  ['4M', '5M'],
  ['4O', '6O'],
  ['4Q', '6O'],
  ['4Q', '5Q'],

  ['5A', '6A'],
  ['5G', '6G'],
  ['5H', '6H'],
  ['5J', '6J'],
  ['5K', '6K'],
  ['5M', '6M'],
  ['5Q', '6Q'],

  ['6A', '8B'],
  ['6C', '8B'],
  ['6C', '6D'],
  ['6D', '8D'],
  ['6D', '6E'],
  ['6E', '8F'],
  ['6G', '8F'],
  ['6H', '8I'],
  ['6J', '8I'],
  ['6J', '6K'],
  ['6K', '8L'],
  ['6M', '8L'],
  ['6M', '6N'],
  ['6N', '8N'],
  ['6N', '6O'],
  ['6O', '8P'],
  ['6Q', '8P'],

  ['8B', '9A'],
  ['8B', '9C'],
  ['8B', '8D'],
  ['8D', '9C'],
  ['8D', '9E'],
  ['8D', '8F'],
  ['8F', '9E'],
  ['8F', '9G'],
  ['8F', '8I'],
  ['8I', '9H'],
  ['8I', '9J'],
  ['8I', '8L'],
  ['8L', '9K'],
  ['8L', '9M'],
  ['8L', '8N'],
  ['8N', '9M'],
  ['8N', '9O'],
  ['8N', '8P'],
  ['8P', '9O'],
  ['8P', '9Q'],

  ['9A', '12A'],
  ['9C', '10C'],
  ['9E', '10E'],
  ['9G', '10G'],
  ['9H', '10H'],
  ['9J', '12H'],
  ['9J', '11J'],
  ['9K', '10K'],
  ['9M', '12M'],
  ['9M', '9O'],
  ['9O', '10O'],
  ['9Q', '10Q'],

  ['10C', '12A'],
  ['10C', '12C'],
  ['10E', '11E'],
  ['10E', '12G'],
  ['10G', '11G'],
  ['10G', '10H'],
  ['10H', '11H'],
  ['10K', '11K'],
  ['10K', '12M'],
  ['10O', '12O'],
  ['10O', '12Q'],
  ['10Q', '12Q'],

  ['11E', '12E'],
  ['11G', '12G'],
  ['11H', '12H'],
  ['11J', '12J'],
  ['11K', '12K'],

  ['12A', '13B'],
  ['12C', '13B'],
  ['12C', '12E'],
  ['12E', '13F'],
  ['12G', '13F'],
  ['12H', '13I'],
  ['12J', '13I'],
  ['12J', '12K'],
  ['12K', '13L'],
  ['12M', '13L'],
  ['12O', '13P'],
  ['12Q', '13P'],

  ['13B', '14B'],
  ['13F', '14F'],
  ['13I', '14I'],
  ['13L', '14L'],
  ['13P', '14P'],

  ['14A', '17B'],
  ['14A', '16E'],
  ['14A', '14B'],
  ['14B', '16E'],
  ['14F', '16E'],
  ['14F', '14I'],
  ['14I', '16M'],
  ['14L', '16M'],
  ['14L', '14P'],
  ['14P', '16M'],
  ['14P', '17L'],

  ['16E', '17B'],
  ['16M', '17L'],
]
