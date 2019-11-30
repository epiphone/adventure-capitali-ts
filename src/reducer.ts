import { produce } from 'immer'
import { Action, State } from './Model'

/** How much business price increases per level upgrade */
const PRICE_LEVEL_MULTIPLIER = 1.14

export default function reducer(state: State, action: Action): State {
  return produce(state, draft => {
    switch (action.type) {
      case 'collect-income-start': {
        const business = draft.businesses[action.index]

        business.collectingIncome = true
        break
      }
      case 'collect-income-done': {
        const business = draft.businesses[action.index]

        business.collectingIncome = false
        draft.capital += business.income * business.level
        break
      }
      case 'upgrade-business': {
        const business = draft.businesses[action.index]

        if (state.capital >= business.price) {
          draft.capital -= business.price
          business.level += 1
          business.price = Math.round(business.price * PRICE_LEVEL_MULTIPLIER)
        }

        break
      }
      case 'hire-manager': {
        const business = draft.businesses[action.index]

        draft.capital -= business.managerPrice
        business.hasManager = true
        break
      }
    }
  })
}
