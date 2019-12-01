import React from 'react'
import * as action from '../../action'
import * as Model from '../../Model'

interface Props {
  business: Model.Business
  dispatch: Model.Dispatch
  index: number
}

const CollectIncomeButton: React.FC<Props> = props => {
  const { business, dispatch, index } = props
  const canCollectIncome =
    business.level > 0 && !business.collectingIncome && !business.hasManager

  function collectIncome() {
    if (canCollectIncome) {
      dispatch(action.startCollectingIncome(index))
    }
  }

  return (
    <button disabled={!canCollectIncome} onClick={collectIncome}>
      Collect income ${business.level * business.income}, (
      {business.incomeCooldownDuration}ms)
    </button>
  )
}

export default CollectIncomeButton
