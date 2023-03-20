import { Line } from "react-konva"
import { useStore } from '@nanostores/react'
import { selection } from '@/stores/wildhearts/weapon-sim'
import { location } from '@/utils/utils'
import type { Coordinate } from '@/types/wildhearts/weapon'

type Props={
  coords: Coordinate[];
}

const colors = {
  stroke: {
    active: '#4ade80',
    inactive: '#a16207',
    candidate: '#fde68a',
  },
}

export default function Path({ coords }: Props): JSX.Element {
  const $selection = useStore(selection)
  const isSelected = () => {
    const foundIdx = $selection.findIndex(item => item.coord === coords[0])
    if(foundIdx === -1) { return false}
    return $selection[foundIdx + 1]?.coord === coords[1] || $selection[foundIdx - 1]?.coord === coords[1]
  }
  const color = (type: keyof typeof colors) => {
    return colors[type][state()]
  }

  const state = ():keyof typeof colors.stroke => {
    if (isSelected()) { return 'active' }
    const lastSelected = $selection[$selection.length - 1]
    if (coords.some(coord => coord === lastSelected.coord)) {
      return 'candidate'
    }
    return 'inactive'
  }

  return (
    <>
      <Line stroke={color('stroke')} strokeWidth={isSelected() ? 5 : 3}
        shadowColor={color('stroke')} shadowBlur={5} shadowEnabled={state() !== 'inactive'}
        points={[location[coords[0]]['x'],location[coords[0]]['y'], location[coords[1]]['x'],location[coords[1]]['y']]} />
    </>
  );
}
