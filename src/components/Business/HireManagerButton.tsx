import React from 'react'
import * as action from '../../action'
import * as Model from '../../Model'
import { formatCurrency } from '../../util'
import TileButton from '../TileButton'

interface Props {
  business: Model.Business
  capital: number
  dispatch: Model.Dispatch
  index: number
}

const HireManagerButton: React.FC<Props> = props => {
  const { business, capital, dispatch, index } = props
  const canHireManager =
    !business.hasManager &&
    business.level > 0 &&
    capital >= business.managerPrice

  function hireManager() {
    if (canHireManager) {
      dispatch(action.hireManager(index))
    }
  }

  return (
    <TileButton
      disabled={!canHireManager}
      onClick={hireManager}
      role="tertiary"
    >
      <b>HIRE</b>
      <span>{formatCurrency(business.managerPrice)}</span>
      <b>MANAGER</b>
    </TileButton>
  )
}

export default HireManagerButton
