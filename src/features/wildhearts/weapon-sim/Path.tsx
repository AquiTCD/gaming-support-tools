import { Line } from "react-konva"
import { useStore } from '@nanostores/react'
import { selection } from '@/stores/wildhearts/weapon-sim'

type Props={
  coords: string[];
}

const columns = 'ABCDEFGHIJKLMNOPQ'
const pos: { [key: string]: {x: number, y:number} } = {}
for(let row:number = 1; row <= 16; row++)  {
  for(let column:number = 1; column <= columns.length; column++) {
    pos[`${String(row)}${columns.charAt(column - 1)}`] = {
      x: column * 80 - 20,
      y: row * 80 - 20,
    }
  }
}

export default function Path({ coords }: Props): JSX.Element {
  const $selection = useStore(selection)
  const isSelected = (coords) => {
    const foundIdx = $selection.findIndex(item => item.coord === coords[0])
    if(foundIdx === -1) { return false}
    return $selection[foundIdx + 1]?.coord === coords[1] || $selection[foundIdx - 1]?.coord === coords[1]
  }
  const lineColor = (coords) => {
    return isSelected(coords) ? '#4ade80' : 'gray'
  }

  return (
    <>
      <Line  stroke={lineColor(coords)} points={[pos[coords[0]]['x'],pos[coords[0]]['y'], pos[coords[1]]['x'],pos[coords[1]]['y']]} />
    </>
  );
}
