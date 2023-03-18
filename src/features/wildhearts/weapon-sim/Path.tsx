import { Line } from "react-konva"
import { useStore } from '@nanostores/react'
import { selection } from '@/stores/wildhearts/weapon-sim'
import { location } from '@/utils/utils'
import type { Coordinate } from '@/types/wildhearts/weapon'

type Props={
  coords: Coordinate[];
}

const colors = {
  stroke: { active: '#4ade80', inactive: '#a16207' },
}

export default function Path({ coords }: Props): JSX.Element {
  const $selection = useStore(selection)
  const isSelected = () => {
    const foundIdx = $selection.findIndex(item => item.coord === coords[0])
    if(foundIdx === -1) { return false}
    return $selection[foundIdx + 1]?.coord === coords[1] || $selection[foundIdx - 1]?.coord === coords[1]
  }
  const color = (type: keyof typeof colors) => {
    const state = isSelected() ? 'active' : 'inactive'
    return colors[type][state]
  }

  return (
    <>
      <Line stroke={color('stroke')} strokeWidth={isSelected() ? 5 : 3}
        shadowColor={colors.stroke.active} shadowBlur={5} shadowEnabled={isSelected()}
        points={[location[coords[0]]['x'],location[coords[0]]['y'], location[coords[1]]['x'],location[coords[1]]['y']]} />
    </>
  );
}
