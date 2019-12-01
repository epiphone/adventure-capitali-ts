import React from 'react'
import * as action from '../../action'
import * as Model from '../../Model'
import { formatCurrency } from '../../util'
import TileButton from '../TileButton'

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
    <TileButton disabled={!canCollectIncome} onClick={collectIncome}>
      {business.hasManager ? (
        <>
          <h2>{formatCurrency(business.level * business.income)}</h2>
          <b>MANAGED</b>
        </>
      ) : (
        <>
          <b>COLLECT</b>
          <h2>{formatCurrency(business.level * business.income)}</h2>
          <b>INCOME</b>
        </>
      )}
    </TileButton>
  )
}

export default CollectIncomeButton
