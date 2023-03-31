import { atom, map } from 'nanostores'
import type { Coordinate } from '@/features/wildhearts/weapon-sim/models/weapon'
import type { CandidateSkill, Candidate } from '@/features/wildhearts/weapon-sim/models/skill'
import type { Vector2d } from 'konva/lib/types'

// modal store
type ModalState = {
  enhanceModal: false | Coordinate,
  requirementsModal: boolean,
  restoreModal: false |  Coordinate,
  skillModal: boolean,
  selectSkillModal: false | Candidate,
}
const initialModalState: ModalState = {
  enhanceModal: false,
  requirementsModal: false,
  restoreModal: false,
  skillModal: false,
  selectSkillModal: false,
}
export const modalStates = map<ModalState>(initialModalState)

/// actions
export const open = (modalName:keyof ModalState, value:Coordinate|Candidate|true = true) => {
  modalStates.setKey(modalName, value)
}
export const close = (modalName:keyof ModalState) => {
  modalStates.setKey(modalName, false)
}

// previewModal store
export const previewModalState = atom<{coord: Coordinate | false, x:number, y:number}>({coord: false, x:0, y:0})

// previewModal actions
export const preview = (coord: Coordinate, position: Vector2d) => {
  // Vector2D == {x:number, y:number}
  previewModalState.set({coord, x:position.x, y: position.y})
}
export const closePreview = () => {
  previewModalState.set({coord: false, x: 0, y: 0})
}
