import React, { useEffect } from 'react'
import useThunkReducer from 'react-hook-thunk-reducer'
import * as action from '../action'
import initialState from '../initialState'
import reducer from '../reducer'
import { formatCurrency } from '../util'
import './App.css'
import Businesses from './Businesses'
import UpgradeMultiplier from './UpgradeMultiplier'

const App: React.FC = () => {
  const [state, dispatch] = useThunkReducer(reducer, initialState)

  // Hydrate/persist state to localStorage when game is opened/closed:
  useEffect(() => {
    dispatch(action.hydrateState())

    function onBeforeUnload() {
      dispatch(action.persistState())
    }

    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [dispatch])

  return (
    <div className="App">
      <div className="App-header">
        <h1>{formatCurrency(state.capital)}</h1>
        <UpgradeMultiplier
          dispatch={dispatch}
          value={state.upgradeMultiplier}
        />
      </div>
      <Businesses dispatch={dispatch} state={state} />
    </div>
  )
}

export default App
