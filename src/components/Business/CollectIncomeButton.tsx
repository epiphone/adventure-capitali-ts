import React from 'react'
import * as action from '../../action'
import * as Model from '../../Model'
import { formatCurrency } from '../../util'
import BouncyLabel from '../BouncyLabel'
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
    <TileButton
      disabled={!canCollectIncome}
      onClick={collectIncome}
      progress={business.collectingIncome}
    >
      {business.hasManager ? (
        <>
          <BouncyLabel>
            {formatCurrency(business.level * business.income)}
          </BouncyLabel>
          <b>MANAGED</b>
        </>
      ) : (
        <>
          <b>COLLECT</b>
          <BouncyLabel>
            {formatCurrency(business.level * business.income)}
          </BouncyLabel>
          <b>INCOME</b>
        </>
      )}
    </TileButton>
  )
}

export default CollectIncomeButton
