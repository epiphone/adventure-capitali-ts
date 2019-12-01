import React from 'react'
import * as action from '../../action'
import * as Model from '../../Model'

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

  return business.hasManager ? (
    <span>Hired a manager!</span>
  ) : canHireManager ? (
    <button onClick={hireManager}>Hire a manager</button>
  ) : null
}

export default HireManagerButton
