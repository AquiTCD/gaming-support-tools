import { atom, map } from 'nanostores'
import type { Coordinate } from '@/features/wildhearts/weapon-sim/models/weapon'
import type { Vector2d } from 'konva/lib/types'

// modal store
const initialModalState = {
  enhanceModal: false,
  requirementsModal: false,
  restoreModal: false,
}
export const modalStates = map<{ [key in keyof typeof initialModalState]: boolean | Coordinate }>(initialModalState)

/// actions
export const open = (modalName:keyof typeof initialModalState, value:Coordinate|true = true) => {
  modalStates.setKey(modalName, value)
}
export const close = (modalName:keyof typeof initialModalState) => {
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
