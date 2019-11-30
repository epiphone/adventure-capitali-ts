import React, { useEffect } from 'react'
import useThunkReducer from 'react-hook-thunk-reducer'
import * as action from '../action'
import { initialState } from '../Model'
import reducer from '../reducer'
import './App.css'
import Businesses from './Businesses'

const App: React.FC = () => {
  const [state, dispatch] = useThunkReducer(reducer, initialState)

  // Managers check for collectable income once per second:
  useEffect(() => {
    const interval = setInterval(() => dispatch(action.runManagers()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="App">
      Capital: {state.capital}$
      <Businesses dispatch={dispatch} state={state} />
    </div>
  )
}

export default App
