import { Circle } from "react-konva"
import { useStore } from '@nanostores/react'
import { selection, modalState, open } from '@/stores/wildhearts/weapon-sim'

type Props={
  coord: string;
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

export default function Weapon({ coord }: Props): JSX.Element {
  const $selection = useStore(selection)
  const $modalState = useStore(modalState)

  const isSelected = (coord):boolean => {
    return Boolean($selection.find(item => item.coord === coord))
  }
  const circleColor = (coord):string => {
    return isSelected(coord) ? '#4ade80' : 'gray'
  }


  return (
    <>
      <Circle onClick={() => open('craftModal', coord)}
       fill={circleColor(coord)} x={pos[coord]['x']} y={pos[coord]['y']} width={40} height={40} />
    </>
  );
}
