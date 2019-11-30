import React, { Dispatch } from 'react'
import * as Model from '../Model'
import Business from './Business'

interface Props {
  dispatch: Dispatch<Model.Action>
  state: Model.State
}

const Businesses: React.FC<Props> = props => {
  return (
    <div>
      {props.state.businesses.map((_, index) => (
        <Business
          key={index}
          state={props.state}
          dispatch={props.dispatch}
          index={index}
        />
      ))}
    </div>
  )
}

export default Businesses
