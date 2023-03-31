import type { Coordinate } from '@/features/wildhearts/weapon-sim/models/weapon'

export type CandidateSkill = {
  name: string,
  coords: Coordinate[]
}

export type Candidate = 'inherent' | 'inherited1' | 'inherited2' | 'inherited3' | 'inherited4' | 'inherited5'

export type CandidateSkills = { [key in Candidate]: CandidateSkill | undefined }
