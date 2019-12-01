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

interface PersistedState {
  state: State
  timestamp: number
}
const LOCAL_STORAGE_KEY = 'state'

export function persistState(): Thunk {
  return (_, getState) => {
    const state = getState()

    const dataToPersist: PersistedState = {
      state: {
        ...state,
        // Reset income collection progress:
        businesses: state.businesses.map(business => ({
          ...business,
          collectingIncome: false
        }))
      },
      timestamp: Date.now()
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToPersist))
  }
}

export function hydrateState(): Thunk {
  return dispatch => {
    const persistedData = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!persistedData) {
      return
    }

    // Supplement previously persisted state with the income gained while absent:
    const { timestamp, state } = JSON.parse(persistedData) as PersistedState
    const incomeMade = calculateIncomeMadeWhileAbsent(
      state,
      Date.now() - timestamp
    )
    dispatch({
      type: 'hydrate-state',
      state: {
        ...state,
        capital: state.capital + incomeMade
      }
    })

    // Restart managers:
    state.businesses.forEach((business, index) => {
      if (business.hasManager) {
        dispatch(startCollectingIncome(index))
      }
    })
  }
}

function calculateIncomeMadeWhileAbsent(
  state: State,
  timeElapsedMs: number
): number {
  return state.businesses.reduce((sum, business) => {
    if (business.hasManager) {
      const count = Math.floor(timeElapsedMs / business.incomeCooldownDuration)
      return sum + count * business.income * business.level
    }
    return sum
  }, 0)
}
