import { atom, onMount } from 'nanostores'
import katanaList from '@/assets/wildhearts/katana_list.json'
import type { Weapon, Coordinate, Paths } from '@/features/wildhearts/weapon-sim/models/weapon'
import { router } from '@/stores/router'
import { searchParams } from '@/stores/searchParams'
import { katanaCoordinates, katanaPaths } from '@/features/wildhearts/weapon-sim/models/katanaMap'
import { wagasaCoordinates, wagasaPaths } from '@/features/wildhearts/weapon-sim/models/wagasaMap'

export const weapons = atom<Weapon[]>([])
export const coordinates = atom<Coordinate[]>([])
export const paths = atom<Paths>([])

// router
onMount(weapons, () => {
  return router.subscribe(async router => {
    if (router?.route !== 'wildheartsWeaponSim') { return }

    switch (router.params.category) {
      case 'katana': {
        await weapons.set([...katanaList] as Weapon[])
        await coordinates.set([...katanaCoordinates])
        await paths.set([...katanaPaths])
        break
      }
      case 'wagasa': {
        // await weapons.set([...wagasaaList] as Weapon[])
        await coordinates.set([...wagasaCoordinates])
        await paths.set([...wagasaPaths])
        break
      }
      default: {
        window.location.href = '/wildhearts/weapon-sim'
      }
    }
  })
})
// query parameter loading
onMount(weapons, () => {
  return searchParams.subscribe(async params => {
    // if (params.c === 'katana') {
    //   weapons.set([...allKatanaList] as Weapon[])
    // }
  })
})
