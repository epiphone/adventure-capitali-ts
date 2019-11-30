import React, { useReducer } from 'react'
import { initialState } from '../Model'
import reducer from '../reducer'
import './App.css'
import Businesses from './Businesses'

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      Capital: {state.capital}$
      <Businesses dispatch={dispatch} state={state} />
    </div>
  )
}

export default App
