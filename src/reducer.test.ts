import { State } from './Model'
import reducer from './reducer'

const state: State = {
  capital: 0,
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
    const newState = reducer(state, { type: 'upgrade-business', index: 0 })

    expect(newState.capital).toEqual(state.capital)
    expect(newState.businesses[0].level).toEqual(state.businesses[0].level)
  })

  it('increases business price and reduces capital on successful upgrade', () => {
    const newState = reducer(
      { ...state, capital: 10 },
      { type: 'upgrade-business', index: 0 }
    )

    expect(newState.capital).toEqual(10 - state.businesses[0].price)
    expect(newState.businesses[0].level).toEqual(state.businesses[0].level + 1)
    expect(newState.businesses[0].price).toBeGreaterThan(
      state.businesses[0].price
    )
  })
})
