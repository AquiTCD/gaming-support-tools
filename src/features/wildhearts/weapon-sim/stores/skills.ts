import { weapons } from '@/features/wildhearts/weapon-sim/stores/weapons'
import { atom, map } from 'nanostores'
import { skillName } from '@/utils/utils'
import type { Coordinate } from '../models/weapon'
import type { Candidate, CandidateSkill, CandidateSkills } from '@/features/wildhearts/weapon-sim/models/skill'

const initialCandidateSkills: CandidateSkills = {
  inherent: undefined,
  inherited1: undefined,
  inherited2: undefined,
  inherited3: undefined,
  inherited4: undefined,
  inherited5: undefined,
}
export const candidateSkills = map<CandidateSkills>(initialCandidateSkills)
export const setCandidate = (to: Candidate, candidate: CandidateSkill) => {
  candidateSkills.setKey(to, candidate)
}
export const removeCandidate = (to: Candidate) => {
  candidateSkills.setKey(to, undefined)
}

// 対象のスキルに対するcoordの配列を作ればいい
// すべての固有スキルとそのcoordを集める
const mappedInherentSkills = weapons.get().reduce((sum, w) => {
  w.inherentSkills.forEach(skill => {
    const name = skillName(skill)
    sum[name] = [...sum[name] ?? '', w.coord] as Coordinate[]
  })
  return sum
}, {})
const allInherentSkills : CandidateSkill[] = []
Object.entries(mappedInherentSkills).forEach(([key, value]) => {
  allInherentSkills.push({ name: key, coords: value })
})
export const inherentSkills = atom(allInherentSkills)

const mappedInheritedSkills = weapons.get().reduce((sum, w) => {
  w.inheritedSkills.forEach(skillset => {
    const name = skillName(skillset.name)
    sum[name] = [...sum[name] ?? '', w.coord] as Coordinate[]
  })
  return sum
}, [])
const allInheritedSkills : CandidateSkill[] = []
Object.entries(mappedInheritedSkills).forEach(([key, value]) => {
  allInheritedSkills.push({ name: key, coords: value })
})
export const inheritedSkills = atom(allInheritedSkills)

export const pinnedWeapons = atom<Coordinate[]>([])
export const togglePin = (coord: Coordinate ) => {
  const current = pinnedWeapons.get()
  if (current.includes(coord)) {
    pinnedWeapons.set(current.filter(c => c != coord))
  } else {
    pinnedWeapons.set([...current, coord])
  }
}
