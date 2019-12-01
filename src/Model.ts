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
  | { type: 'hydrate-state'; state: State }

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
