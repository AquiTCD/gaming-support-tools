export const allWeaponList = [
  {
    coord: '1D',
    name: 'ダガー',
    charac: '斬撃',
    attack: 15,
    critical: 5,
    attribute: '',
    attributePower: 0,
    inherentSkills: [],
    inheritedSkills: [],
    capacity: 2,
    gold: 0,
    materials: []
  },
  {
    coord: '1I',
    name: 'ひのきのぼう',
    charac: '殴打',
    attack: 10,
    critical: 0,
    attribute: '',
    attributePower: 0,
    inherentSkills: [],
    inheritedSkills: [],
    capacity: 2,
    gold: 100,
    materials: [
      { name: '木', count: 2 }
    ]
  },
  {
    coord: '1N',
    name: 'くだものナイフ',
    charac: '斬撃',
    attack: 13,
    critical: 2,
    attribute: '',
    attributePower: 0,
    inherentSkills: ['皮剥き'],
    inheritedSkills: [
      {id: '1N-0', name: 'ピーラーいらず' }
    ],
    capacity: 2,
    gold: 100,
    materials: [
      { name: '木', count: 2 },
      { name: '鉄', count: 1 }
    ]
  },
  {
    coord: '4O',
    name: '包丁',
    charac: '斬撃',
    attack: 17,
    critical: 0,
    attribute: '火',
    attributePower: 8,
    inherentSkills: ['皮剥き'
    ],
    inheritedSkills: [
      {id: '4O-0', name: 'カレー曜日'
      }
    ],
    capacity: 2,
    gold: 300,
    materials: [
      { name: '砥石', count: 3 },
      { name: '鉄', count: 1 }
    ]
  },
  {
    coord: '5O',
    name: '超すごい刀',
    charac: '斬撃',
    attack: 200,
    critical: 20,
    attribute: '風',
    attributePower: 100,
    inherentSkills: ['悪・即・斬'
    ],
    inheritedSkills: [
      {id: '5O', name: 'つばめ返し'
      }
    ],
    capacity: 3,
    gold: 500,
    materials: [
      { name: '狒狒色金', count: 1 }
    ]
  }
]
