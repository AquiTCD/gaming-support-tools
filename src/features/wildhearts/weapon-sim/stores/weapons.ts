import { atom, onMount } from 'nanostores'
import katanaList from '@/assets/wildhearts/katana_list.json'
import bowList from '@/assets/wildhearts/bow_list.json'
import clawList from '@/assets/wildhearts/claw_list.json'
import canonList from '@/assets/wildhearts/canon_list.json'
import type { Weapon, Coordinate, Paths, Select } from '@/features/wildhearts/weapon-sim/models/weapon'
import { router } from '@/stores/router'
import { searchParams } from '@/stores/searchParams'
import { katanaCoordinates, katanaPaths } from '@/features/wildhearts/weapon-sim/models/katanaMap'
import { bowCoordinates, bowPaths } from '@/features/wildhearts/weapon-sim/models/bowMap'
import { clawCoordinates, clawPaths } from '@/features/wildhearts/weapon-sim/models/clawMap'
import { canonCoordinates, canonPaths } from '@/features/wildhearts/weapon-sim/models/canonMap'
import { wagasaCoordinates, wagasaPaths } from '@/features/wildhearts/weapon-sim/models/wagasaMap'

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
      case 'bow': {
        weapons.set([...bowList] as Weapon[])
        coordinates.set([...bowCoordinates])
        paths.set([...bowPaths])
        return
      }
      case 'claw': {
        weapons.set([...clawList] as Weapon[])
        coordinates.set([...clawCoordinates])
        paths.set([...clawPaths])
        return
      }
      case 'canon': {
        weapons.set([...canonList] as Weapon[])
        coordinates.set([...canonCoordinates])
        paths.set([...canonPaths])
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
    console.log(params)
    selection.get()
    return
    // switch (params.c) {
    //   case 'katana': {
    //     weapons.set([...katanaList] as Weapon[])
    //     coordinates.set([...katanaCoordinates])
    //     paths.set([...katanaPaths])
    //     break
    //   }
    //   default: {
    //     console.log(router)
    //     window.location.href = '/wildhearts/weapon-sim'
    //   }
    // }
  })
})
