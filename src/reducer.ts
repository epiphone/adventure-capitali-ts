import { Reducer } from 'react'
import { produce } from 'immer'
import * as Model from './Model'

const UPGRADE_MULTIPLIER_LEVELS: Model.UpgradeMultiplier[] = [1, 10, 100, 'max']

const reducer: Reducer<Model.State, Model.Action> = (
  state: Model.State,
  action: Model.Action
) =>
  produce(state, draft => {
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

        if (state.capital >= action.price) {
          draft.capital -= action.price
          business.level += action.multiplier
          business.price = Math.round(
            action.price * Model.PRICE_LEVEL_MULTIPLIER
          )
        }

        break
      }
      case 'hire-manager': {
        const business = draft.businesses[action.index]

        draft.capital -= business.managerPrice
        business.hasManager = true
        break
      }
      case 'toggle-upgrade-multiplier': {
        const nextIndex =
          (UPGRADE_MULTIPLIER_LEVELS.indexOf(state.upgradeMultiplier) + 1) %
          UPGRADE_MULTIPLIER_LEVELS.length

        draft.upgradeMultiplier = UPGRADE_MULTIPLIER_LEVELS[nextIndex]
        break
      }
    }
  })

export default reducer
