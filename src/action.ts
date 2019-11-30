import { Thunk } from 'react-hook-thunk-reducer'
import { Action, State } from './Model'

export function collectIncome(index: number): Thunk<State, Action> {
  return (dispatch, getState) => {
    const business = getState().businesses[index]

    dispatch({ type: 'collect-income-start', index })
    setTimeout(
      () => dispatch({ type: 'collect-income-done', index }),
      business.incomeCooldownDuration
    )
  }
}

export function runManagers(): Thunk<State, Action> {
  return (dispatch, getState) => {
    const businesses = getState().businesses

    businesses.forEach((business, index) => {
      if (business.hasManager && !business.collectingIncome) {
        dispatch(collectIncome(index))
      }
    })
  }
}
