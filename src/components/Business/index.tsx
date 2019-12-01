import React from 'react'
import * as Model from '../../Model'
import CollectIncomeButton from './CollectIncomeButton'
import HireManagerButton from './HireManagerButton'
import UnboughtBusiness from './UnboughtBusiness'
import UpgradeButton from './UpgradeButton'
import './index.css'

interface Props {
  business: Model.Business
  capital: number
  dispatch: Model.Dispatch
  index: number
  upgradeMultiplier: Model.UpgradeMultiplier
}

const Business: React.FC<Props> = props => {
  const { business } = props

  if (business.level === 0) {
    return <UnboughtBusiness {...props} />
  }

  return (
    <div className="Business">
      <div className="Business-header">
        <b>{business.name}</b>
      </div>
      <div className="Business-body">
        <UpgradeButton {...props} />
        <CollectIncomeButton {...props} />
        {!business.hasManager && <HireManagerButton {...props} />}
      </div>
    </div>
  )
}

export default Business
