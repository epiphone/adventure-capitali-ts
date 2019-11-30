import React from 'react'
import * as Model from '../Model'

interface Props {
  dispatch: Model.Dispatch
  state: Model.State
  index: number
}

const Business: React.FC<Props> = ({ state, dispatch, index }) => {
  const business = state.businesses[index]

  const canCollectIncome =
    business.level > 0 && !business.collectingIncome && !business.hasManager
  const canUpgrade = state.capital >= business.price

  function collectIncome() {
    if (canCollectIncome) {
      dispatch({ type: 'collect-income-start', index })
      setTimeout(
        () => dispatch({ type: 'collect-income-done', index }),
        business.incomeCooldownDuration
      )
    }
  }

  function upgrade() {
    if (canUpgrade) {
      dispatch({ type: 'upgrade-business', index })
    }
  }

  return (
    <div>
      {business.name} | level: {business.level} | price: {business.price}
      <button disabled={!canUpgrade} onClick={upgrade}>
        Upgrade
      </button>
      <button disabled={!canCollectIncome} onClick={collectIncome}>
        Collect income ({business.level * business.income})
      </button>
    </div>
  )
}

export default Business
