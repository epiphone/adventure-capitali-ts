import React from 'react'
import * as action from '../../action'
import * as Model from '../../Model'
import UpgradeButton from './UpgradeButton'

interface Props {
  dispatch: Model.Dispatch
  state: Model.State
  index: number
}

const Business: React.FC<Props> = ({ state, dispatch, index }) => {
  const business = state.businesses[index]

  const canCollectIncome =
    business.level > 0 && !business.collectingIncome && !business.hasManager
  const canHireManager =
    !business.hasManager &&
    business.level > 0 &&
    state.capital >= business.managerPrice

  function collectIncome() {
    if (canCollectIncome) {
      dispatch(action.collectIncome(index))
    }
  }

  function hireManager() {
    if (canHireManager) {
      dispatch({ type: 'hire-manager', index })
    }
  }

  return (
    <div>
      {business.name} | level: {business.level}
      <UpgradeButton dispatch={dispatch} index={index} state={state} />
      <button disabled={!canCollectIncome} onClick={collectIncome}>
        Collect income ${business.level * business.income}, (
        {business.incomeCooldownDuration}ms)
      </button>
      {business.hasManager ? (
        <span>Hired a manager!</span>
      ) : canHireManager ? (
        <button onClick={hireManager}>Hire a manager</button>
      ) : null}
    </div>
  )
}

export default Business
