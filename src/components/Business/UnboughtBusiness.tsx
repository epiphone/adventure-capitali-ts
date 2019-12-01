import React from 'react'
import * as Model from '../../Model'
import { formatCurrency } from '../../util'
import TileButton from '../TileButton'
import './index.css'

interface Props {
  business: Model.Business
  capital: number
  dispatch: Model.Dispatch
  index: number
}

const UnboughtBusiness: React.FC<Props> = props => {
  const { business, capital, dispatch, index } = props
  const canBuy = capital >= business.price

  function buy() {
    if (canBuy) {
      dispatch({
        type: 'upgrade-business',
        index,
        multiplier: 1,
        price: business.price
      })
    }
  }

  return (
    <div
      className={`Business Business-forSale ${canBuy ? '' : 'Business-locked'}`}
    >
      <div className="Business-body">
        <TileButton disabled={!canBuy} onClick={buy} role="secondary">
          <b>{business.name}</b>
          <h2>{formatCurrency(business.price)}</h2>
          <b>{canBuy ? 'BUY' : 'INSUFFICIENT FUNDS'}</b>
        </TileButton>
      </div>
    </div>
  )
}

export default UnboughtBusiness
