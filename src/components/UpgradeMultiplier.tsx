import React from 'react'
import * as Model from '../Model'

interface Props {
  dispatch: Model.Dispatch
  value: Model.UpgradeMultiplier
}

const UpgradeMultiplier: React.FC<Props> = ({ dispatch, value }) => {
  return (
    <button onClick={() => dispatch({ type: 'toggle-upgrade-multiplier' })}>
      x{value}
    </button>
  )
}

export default UpgradeMultiplier
