import { Dispatch as ReactDispatch } from 'react'
import { Thunk } from 'react-hook-thunk-reducer'

export interface State {
  capital: number
  businesses: Business[]

  /** Upgrade multiple levels with one click */
  upgradeMultiplier: UpgradeMultiplier
}

export type UpgradeMultiplier = 1 | 10 | 100 | 'max'

/** How much business price increases per level upgrade */
export const PRICE_LEVEL_MULTIPLIER = 1.14

export type Action =
  | { type: 'collect-income-start'; index: number }
  | { type: 'collect-income-done'; index: number }
  | {
      type: 'upgrade-business'
      index: number
      multiplier: number
      price: number
    }
  | { type: 'hire-manager'; index: number }
  | { type: 'toggle-upgrade-multiplier' }

export type Dispatch = ReactDispatch<Action | Thunk<State, Action>>

export interface Business {
  name: string
  level: number
  price: number

  income: number
  incomeCooldownDuration: number
  collectingIncome?: boolean

  hasManager?: boolean
  managerPrice: number
}

export const initialState: State = {
  capital: 0,
  upgradeMultiplier: 1,
  businesses: [
    {
      name: 'Lemonade Stand',
      level: 1,
      price: 4,
      income: 1,
      incomeCooldownDuration: 1000,
      managerPrice: 1000
    },
    {
      name: 'Newspaper Delivery',
      level: 0,
      price: 60,
      income: 60,
      incomeCooldownDuration: 3000,
      managerPrice: 15_000
    },
    {
      name: 'Car Wash',
      level: 0,
      price: 720,
      income: 540,
      incomeCooldownDuration: 6000,
      managerPrice: 100_000
    },
    {
      name: 'Pizza Delivery',
      level: 0,
      price: 8640,
      income: 4320,
      incomeCooldownDuration: 12_000,
      managerPrice: 500_000
    },
    {
      name: 'Donut Shop',
      level: 0,
      price: 103_680,
      income: 51_840,
      incomeCooldownDuration: 24_000,
      managerPrice: 1_200_000
    },
    {
      name: 'Shrimp Boat',
      level: 0,
      price: 1_244_160,
      income: 622_080,
      incomeCooldownDuration: 48_000,
      managerPrice: 10_000_000
    },
    {
      name: 'Hockey Team',
      level: 0,
      price: 14_929_920,
      income: 7_464_960,
      incomeCooldownDuration: 96_000,
      managerPrice: 111_111_111
    },
    {
      name: 'Movie Studio',
      level: 0,
      price: 179_159_040,
      income: 89_579_520,
      incomeCooldownDuration: 192_000,
      managerPrice: 555_555_555
    },
    {
      name: 'Bank',
      level: 0,
      price: 2_149_908_480,
      income: 1_074_954_240,
      incomeCooldownDuration: 384_000,
      managerPrice: 10_000_000_000
    },
    {
      name: 'Oil Company',
      level: 0,
      price: 25_798_901_760,
      income: 12_899_450_880,
      incomeCooldownDuration: 768_000,
      managerPrice: 100_000_000_000
    }
  ]
}
