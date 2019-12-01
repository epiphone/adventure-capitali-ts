import { Thunk as ThunkAction } from 'react-hook-thunk-reducer'
import { Action, State } from './Model'

type Thunk = ThunkAction<State, Action>

export function startCollectingIncome(index: number): Thunk {
  return (dispatch, getState) => {
    const business = getState().businesses[index]

    dispatch({ type: 'collect-income-start', index })
    setTimeout(
      () => dispatch(finishCollectingIncome(index)),
      business.incomeCooldownDuration
    )
  }
}

function finishCollectingIncome(index: number): Thunk {
  return (dispatch, getState) => {
    dispatch({ type: 'collect-income-done', index })

    const business = getState().businesses[index]
    if (business.hasManager) {
      dispatch(startCollectingIncome(index))
    }
  }
}

export function hireManager(index: number): Thunk {
  return (dispatch, getState) => {
    dispatch({ type: 'hire-manager', index })

    const business = getState().businesses[index]
    if (!business.collectingIncome) {
      dispatch(startCollectingIncome(index))
    }
  }
}
