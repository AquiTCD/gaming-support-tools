import { atom, onMount } from 'nanostores'
import katanaList from '@/assets/wildhearts/katana_list.json'
import nodachiList from '@/assets/wildhearts/nodachi_list.json'
import maulList from '@/assets/wildhearts/maul_list.json'
import bowList from '@/assets/wildhearts/bow_list.json'
import clawList from '@/assets/wildhearts/claw_list.json'
import canonList from '@/assets/wildhearts/canon_list.json'
import staffList from '@/assets/wildhearts/staff_list.json'
import type { Weapon, Coordinate, Paths, Select } from '@/features/wildhearts/weapon-sim/models/weapon'
import { router } from '@/stores/router'
import { searchParams } from '@/stores/searchParams'
import { katanaCoordinates, katanaPaths } from '@/features/wildhearts/weapon-sim/models/katanaMap'
import { nodachiCoordinates, nodachiPaths } from '@/features/wildhearts/weapon-sim/models/nodachiMap'
import { maulCoordinates, maulPaths } from '@/features/wildhearts/weapon-sim/models/maulMap'
import { bowCoordinates, bowPaths } from '@/features/wildhearts/weapon-sim/models/bowMap'
import { wagasaCoordinates, wagasaPaths } from '@/features/wildhearts/weapon-sim/models/wagasaMap'
import { canonCoordinates, canonPaths } from '@/features/wildhearts/weapon-sim/models/canonMap'
import { clawCoordinates, clawPaths } from '@/features/wildhearts/weapon-sim/models/clawMap'
import { staffCoordinates, staffPaths } from '@/features/wildhearts/weapon-sim/models/staffMap'
import pako from 'pako'
import { Buffer } from 'buffer'

export const weapons = atom<Weapon[]>([])
export const coordinates = atom<Coordinate[]>([])
export const paths = atom<Paths>([])
export const selection = atom<Select[]>([{order:1, coord:'1I', skills:[]}])

// router
onMount(weapons, () => {
  router.subscribe(router => {
    if (router?.route !== 'wildheartsWeaponSim') {
       return window.location.href = window.location.href
    }

    switch (router.params.category) {
      case 'katana': {
        weapons.set([...katanaList] as Weapon[])
        coordinates.set([...katanaCoordinates])
        paths.set([...katanaPaths])
        return
      }
      case 'nodachi': {
        weapons.set([...nodachiList] as Weapon[])
        coordinates.set([...nodachiCoordinates])
        paths.set([...nodachiPaths])
        return
      }
      case 'maul': {
        weapons.set([...maulList] as Weapon[])
        coordinates.set([...maulCoordinates])
        paths.set([...maulPaths])
        return
      }
      case 'bow': {
        weapons.set([...bowList] as Weapon[])
        coordinates.set([...bowCoordinates])
        paths.set([...bowPaths])
        return
      }
      case 'canon': {
        weapons.set([...canonList] as Weapon[])
        coordinates.set([...canonCoordinates])
        paths.set([...canonPaths])
        return
      }
      case 'claw': {
        weapons.set([...clawList] as Weapon[])
        coordinates.set([...clawCoordinates])
        paths.set([...clawPaths])
        return
      }
      case 'staff': {
        weapons.set([...staffList] as Weapon[])
        coordinates.set([...staffCoordinates])
        paths.set([...staffPaths])
        return
      }
      case 'wagasa': {
        // weapons.set([...wagasaaList] as Weapon[])
        coordinates.set([...wagasaCoordinates])
        paths.set([...wagasaPaths])
        return
      }
      case 'changelog': {
        return window.location.href = window.location.href

      }
      default: {
        return window.location.href = '/wildhearts/weapon-sim'
      }
    }
  })
})
// query parameter loading
onMount(weapons, () => {
  return searchParams.subscribe(async params => {
    // decode
    if (!Boolean(params.s)) { return }

    const decodedStr = decodeURIComponent(params.s)
    const raw = await Buffer.from(decodedStr, 'base64')
    const restoredObj = await JSON.parse(pako.inflate(raw, { to: 'string' }))
    const restredSelection = restoredObj.map(obj => {
      const skills = obj.s.map(skillId => {
        const coord = skillId.split('-')[0]
        const source = weapons.get().find(weapon => weapon.coord === coord)
        return source?.inheritedSkills.find(inheritedSkill => inheritedSkill.id === skillId)
      })
      return { coord: obj.c, order: obj.o, skills: skills }
    }
    )
    selection.set([...restredSelection])
  })
})
