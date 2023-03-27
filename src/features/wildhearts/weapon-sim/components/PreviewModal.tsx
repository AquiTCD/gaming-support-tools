import { useStore } from '@nanostores/react'
import { previewModalState, closePreview, open } from '@/features/wildhearts/weapon-sim/stores/modals'
import { paths, selection } from '@/features/wildhearts/weapon-sim/stores/weapons'
import { weapons } from '@/features/wildhearts/weapon-sim/stores/weapons'
import useWindowSize from '@/hooks/useWindowSize'
import { useIsTouchScreen } from '@/hooks/useIsTouchScreen'
import type { Weapon, Coordinate, Path,  } from '@/features/wildhearts/weapon-sim/models/weapon'
import { characColor, attributeColor  } from '@/features/wildhearts/weapon-sim/models/weapon'
import SkillToolTip from '@/features/wildhearts/weapon-sim/components/WeaponSkillToolTip'
import Draggable, {DraggableCore} from 'react-draggable'

export default function PreviewModal(): JSX.Element | null {
  const $selection = useStore(selection)
  const $paths = useStore(paths)
  const $weapons = useStore(weapons)
  const $modalStates = useStore(previewModalState)
  const [width, height] = useWindowSize()
  const coord = $modalStates.coord as Coordinate
  const previewWeapon: Weapon = $weapons.find(weapon => weapon.coord === coord)!
  const lastSelected = $selection[$selection.length - 1]
  const currentWeapon: Weapon = $weapons.find(weapon => weapon.coord === lastSelected.coord)!

  const { isTouchScreen } = useIsTouchScreen()
  const posClass = { x: 'right-[20px]', y: 'top-[80px]' }
  if (!isTouchScreen) {
    posClass.x = width > 1300 ? 'left-[1050px]' :
    (width - $modalStates.x) > 350 ? 'right-[20px]' : 'right-[350px]'
    posClass.y = $modalStates.y < 500 ? 'top-[80px]' : 'top-[500px]'
  }

  const comparedColor = (attr: keyof Weapon):string  => {
    switch (true) {
      case previewWeapon[attr] > currentWeapon[attr]: {
        return 'text-green-300'
      }
      case previewWeapon[attr] < currentWeapon[attr]: {
        return 'text-red-400'
      }
      default: {
        return ''
      }
    }
  }
  const isSelected = ():boolean => {
    return Boolean($selection.find(item => item.coord === coord))
  }

  const canEnhance = ():boolean => {
    if (isSelected()) {return false }
    const candidates = $paths.reduce((sum: Path[], path: Path) => {
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
    return candidates.includes(coord)
  }

  if (Boolean(coord)) {
    return (
      <>
        <Draggable
          handle="#previewModal"
          defaultPosition={{x: 0, y: 0}}
          cancel=".cancel-drag"
        >
        <table id="previewModal" className={`bg-gray-800/75 border-separate border-4 border-amber-400 text-gray-100 w-40 md:w-52 rounded-lg border-spacing-0 absolute cursor-grab active:cursor-grabbing ${posClass.x} ${posClass.y}`}>
          <tbody className="text-xs md:text-sm">
          <tr>
            <td className="border-b-2 border-amber-200 text-center text-sm md:text-base py-1 md:py-2 font-bold" colSpan={2}>{previewWeapon.name}</td>
          </tr>
          <tr>
            <th className="border-b border-amber-200 text-right font-normal w-20 md:w-24">攻撃力</th>
            <td className="border-b border-amber-200 text-right pr-3 md:pr-5 font-bold text-l">
              <span className={`mr-2 text-[0.6rem] md:text-xs ${characColor(previewWeapon)}`}>{previewWeapon.charac}</span>
              <span className={comparedColor('attack')}>{previewWeapon.attack}</span>
            </td>
          </tr>
          <tr>
            <th className="border-b border-amber-200 text-right font-normal w-20 md:w-24">属性攻撃力</th>
            <td className="border-b border-amber-200 text-right pr-3 md:pr-5 font-bold text-l">
              <span className={`mr-2 text-[0.6rem] md:text-xs ${attributeColor(previewWeapon)}`}>{previewWeapon.attribute}</span>
              <span className={comparedColor('attributePower')}>{previewWeapon.attributePower}</span>
            </td>
          </tr>
          <tr>
            <th className="border-b border-amber-200 text-right font-normal w-20 md:w-24">会心率</th>
            <td className="border-b border-amber-200 text-right pr-3 md:pr-5 font-bold text-l">
              <span className={comparedColor('critical')}>
                <span>{previewWeapon.critical}</span>
                <span>%</span>
              </span>
            </td>
          </tr>
          <tr>
            <th className="border-b-2 border-amber-200" colSpan={2}>固有技能</th>
          </tr>
          <tr>
            <td colSpan={2}>
              <ul>
                { [0,1,2].map(i => {
                  return <li key={i} className="bg-gray-900/75 h-6 pt-0.5 mb-1 px-2 cancel-drag" data-tooltip-id="skill-preview-tooltip" data-tooltip-content={previewWeapon.inherentSkills[i]}>{previewWeapon.inherentSkills[i]}</li>
                })}
              </ul>
            </td>
          </tr>
          <tr>
            <th className="border-b-2 border-amber-200" colSpan={2}>継承技能</th>
          </tr>
          <tr>
            <td colSpan={2}>
              <ul>
                { [...Array(5)].map((_, i) => i).map(i => {
                  let classes = "bg-gray-900/75 h-6 pt-0.5 mb-1 px-2 cancel-drag"
                  let skill = previewWeapon.inheritedSkills[i]
                  if (skill) {
                    return <li key={i} className={classes} data-tooltip-id="skill-preview-tooltip" data-tooltip-content={skill.name}>{skill.name}</li>
                  }
                  if (i >= previewWeapon.inheritedSkills.length + previewWeapon.capacity) {
                    classes = 'h-6 pt-0.5 mb-1 px-2'
                  }
                  return <li key={i} className={classes}></li>
                })}
              </ul>
            </td>
          </tr>
          { isTouchScreen && isSelected() &&
          <tr>
            <td colSpan={2} className="text-center">
              <button type="button" onTouchEnd={() => { open('restoreModal', coord); closePreview() } }
                className="text-gray-800 bg-amber-300 rounded-lg px-3 py-1 mb-1 font-bold">
                巻き戻す
              </button>
            </td>
          </tr>
          }
          { isTouchScreen && canEnhance() &&
          <tr>
            <td colSpan={2} className="text-center">
              <button type="button" onTouchEnd={() => { open('enhanceModal', coord); closePreview() } }
                className="text-gray-800 bg-amber-300 rounded-lg px-3 py-1 mb-1 font-bold">
                強化
              </button>
            </td>
          </tr>
          }
          </tbody>
        </table>
        </Draggable>
        <SkillToolTip id="skill-preview-tooltip" />
      </>
    )
  } else {
    return null
  }
}
