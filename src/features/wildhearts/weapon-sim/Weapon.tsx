import { Circle } from "react-konva"
import React, { useState } from 'react'
import { useStore } from '@nanostores/react'
import { selection } from '@/stores/wildhearts/weapon-sim'
import InheritModal from '@/features/wildhearts/weapon-sim/InheritModal'

type Props={
  coord: string;
}

const columns = 'ABCDEFG'
const pos: { [key: string]: {x: number, y:number} } = {}
for(let row:number = 1; row <= 7; row++)  {
  for(let column:number = 1; column <= columns.length; column++) {
    pos[`${String(row)}${columns.charAt(column - 1)}`] = {
      x: column * 100,
      y: row * 100,
    }
  }
}

export default function Weapon({ coord }: Props): JSX.Element {
  const $selection = useStore(selection)
  const [showInheritModal, setShowInheritModal] = useState(false)

  const isSelected = (coord):boolean => {
    return Boolean($selection.find(item => item.coord === coord))
  }
  const circleColor = (coord):string => {
    return isSelected(coord) ? '#4ade80' : 'gray'
  }


  return (
    <>
      <Circle onClick={() => setShowInheritModal(true)}
       fill={circleColor(coord)} x={pos[coord]['x']} y={pos[coord]['y']} width={50} height={50} />
      <InheritModal showInheritModal={showInheritModal} setShowInheritModal={setShowInheritModal} />
    </>
  );
}
