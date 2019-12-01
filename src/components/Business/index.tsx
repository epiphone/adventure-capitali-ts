import React from 'react'
import * as Model from '../../Model'
import CollectIncomeButton from './CollectIncomeButton'
import HireManagerButton from './HireManagerButton'
import UpgradeButton from './UpgradeButton'

interface Props {
  dispatch: Model.Dispatch
  state: Model.State
  index: number
}

const Business: React.FC<Props> = ({ state, dispatch, index }) => {
  const business = state.businesses[index]

  return (
    <div>
      {business.name} | level: {business.level}
      <UpgradeButton
        business={business}
        capital={state.capital}
        dispatch={dispatch}
        index={index}
        upgradeMultiplier={state.upgradeMultiplier}
      />
      <CollectIncomeButton
        business={business}
        dispatch={dispatch}
        index={index}
      />
      <HireManagerButton
        business={business}
        capital={state.capital}
        dispatch={dispatch}
        index={index}
      />
    </div>
  )
}

export default Business
