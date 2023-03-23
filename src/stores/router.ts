import { createRouter } from '@nanostores/router'

export const router = createRouter({
  home: '/',
  wildheartsWeaponSim: '/wildhearts/weapon-sim/:category',
} as const)
