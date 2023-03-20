import { Circle } from "react-konva"
import { useStore } from '@nanostores/react'
import { selection, modalState, open } from '@/stores/wildhearts/weapon-sim'
import { location } from '@/utils/utils'
import { paths } from '@/types/wildhearts/weapon'
import type { Coordinate, Path } from '@/types/wildhearts/weapon'

type Props={
  coord: Coordinate;
}

const colors = {
  fill: { active: '#15803d', inactive: '#1f2937', candidate: '#a16207' },
  stroke: { active: '#4ade80', inactive: '#a16207', candidate: '#fde68a' },
}


export default function Weapon({ coord }: Props): JSX.Element {
  const $selection = useStore(selection)

  const isSelected = () => {
    return Boolean($selection.find(item => item.coord === coord))
  }
  const state = ():keyof typeof colors.stroke => {
    if (isSelected()) { return 'active' }
    const lastSelected = $selection[$selection.length - 1]
    const candidates = paths.reduce((sum: Path[], path: Path) => {
      switch (true) {
        case path[0] === lastSelected.coord: {
          return [...sum, path[1]] as Path[]
        }
        case path[1] === lastSelected.coord: {
          return [...sum, path[0]] as Path[]
        }
        default: {
          return sum
        }
      }
    }, [])
    if(candidates.includes(coord)) {
      return 'candidate'
    }
    return 'inactive'
  }

  const color = (type: keyof typeof colors) => {
    return colors[type][state()]
  }

  const enhanceOrRestore = () => {
    switch (state()) {
      case 'active': {
        // open('restoreModal', coord)
        break
      }
      case 'candidate': {
        open('enhanceModal', coord)
        break
      }
      default: {
        break
      }
    }
  }

  return (
    <>
      <Circle onClick={() => enhanceOrRestore()}
        fill={color('fill')} stroke={color('stroke')}
        shadowColor={color('stroke')} shadowBlur={15} shadowEnabled={state() !== 'inactive'}
        x={location[coord]['x']} y={location[coord]['y']} width={isSelected() ? 30 : 40} height={isSelected() ? 30 : 40}
        onMouseOver={e => {
          if (state() !== 'inactive') {
            const container = e.target.getStage()!.container();
            container.style.cursor = "pointer";
          }
        }}
        onMouseLeave={e => {
          if (state() !== 'inactive') {
            const container = e.target.getStage()!.container();
            container.style.cursor = "default";
          }
        }}
        />
    </>
  );
}
