import { Action, PRICE_LEVEL_MULTIPLIER, State } from './Model'
import reducer, { INCOME_SPEED_DOUBLING_THRESHOLDS } from './reducer'

const state: State = {
  capital: 10,
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
    }
  ]
}

describe('upgrade business', () => {
  it('does nothing upon insufficient capital', () => {
    const action: Action = {
      type: 'upgrade-business',
      index: 0,
      multiplier: 1,
      price: state.capital + 1
    }
    const newState = reducer(state, action)

    expect(newState.capital).toEqual(state.capital)
    expect(newState.businesses[0].level).toEqual(state.businesses[0].level)
  })

  it('increases business price and reduces capital on successful upgrade', () => {
    const action: Action = {
      type: 'upgrade-business',
      index: 0,
      multiplier: 2,
      price: 8
    }
    const newState = reducer(state, action)

    expect(newState.capital).toEqual(state.capital - action.price)
    expect(newState.businesses[0].level).toEqual(
      state.businesses[0].level + action.multiplier
    )
    expect(newState.businesses[0].price).toEqual(
      Math.round(action.price * PRICE_LEVEL_MULTIPLIER)
    )
    expect(newState.businesses[0].incomeCooldownDuration).toEqual(
      state.businesses[0].incomeCooldownDuration
    )
  })

  it('doubles income collection speed after passing an upgrade threshold', () => {
    const action: Action = {
      type: 'upgrade-business',
      index: 1,
      multiplier: 25,
      price: 0
    }
    const newState = reducer(state, action)

    expect(newState.businesses[1].incomeCooldownDuration).toEqual(
      state.businesses[1].incomeCooldownDuration / 2
    )
  })

  it('doubles income collection speed multiple times when passing multiple upgrade thresholds', () => {
    const thresholdsPassed = 4
    const action: Action = {
      type: 'upgrade-business',
      index: 1,
      multiplier: INCOME_SPEED_DOUBLING_THRESHOLDS[thresholdsPassed - 1],
      price: 0
    }
    const newState = reducer(state, action)

    expect(newState.businesses[1].incomeCooldownDuration).toEqual(
      state.businesses[1].incomeCooldownDuration / Math.pow(2, thresholdsPassed)
    )
  })
})
