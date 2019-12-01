import React from 'react'
import * as Model from '../Model'
import Business from './Business'
import './Businesses.css'

interface Props {
  dispatch: Model.Dispatch
  state: Model.State
}

/**
 * Render businesses responsively in 1 or 2 columns.
 */
const Businesses: React.FC<Props> = ({ dispatch, state }) => {
  const halfway = Math.ceil(state.businesses.length / 2)

  return (
    <div className="Businesses">
      <div>
        {state.businesses.slice(0, halfway).map((business, index) => (
          <Business
            key={index}
            business={business}
            capital={state.capital}
            dispatch={dispatch}
            index={index}
            upgradeMultiplier={state.upgradeMultiplier}
          />
        ))}
      </div>
      <div>
        {state.businesses.slice(halfway).map((business, index) => (
          <Business
            key={index}
            business={business}
            capital={state.capital}
            dispatch={dispatch}
            index={halfway + index}
            upgradeMultiplier={state.upgradeMultiplier}
          />
        ))}
      </div>
    </div>
  )
}

export default Businesses
