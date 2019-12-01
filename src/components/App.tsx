import React from 'react'
import useThunkReducer from 'react-hook-thunk-reducer'
import { initialState } from '../Model'
import reducer from '../reducer'
import './App.css'
import Businesses from './Businesses'
import UpgradeMultiplier from './UpgradeMultiplier'

const App: React.FC = () => {
  const [state, dispatch] = useThunkReducer(reducer, initialState)

  return (
    <div className="App">
      Capital: {state.capital}$
      <UpgradeMultiplier dispatch={dispatch} value={state.upgradeMultiplier} />
      <Businesses dispatch={dispatch} state={state} />
    </div>
  )
}

export default App
