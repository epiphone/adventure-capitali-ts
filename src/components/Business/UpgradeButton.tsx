import React from 'react'
import * as Model from '../../Model'
import * as action from '../../action'
import { formatCurrency } from '../../util'
import BouncyLabel from '../BouncyLabel'
import TileButton from '../TileButton'

interface Props {
  business: Model.Business
  capital: number
  dispatch: Model.Dispatch
  index: number
  upgradeMultiplier: Model.UpgradeMultiplier
}

const UpgradeButton: React.FC<Props> = props => {
  const { business, capital, dispatch, index, upgradeMultiplier } = props

  const { multiplier, price } = resolveMultiplier(
    business.price,
    capital,
    upgradeMultiplier
  )
  const canUpgrade = capital >= price

  function upgrade() {
    if (canUpgrade) {
      dispatch(action.upgradeBusiness({ index, multiplier, price }))
    }
  }

  return (
    <TileButton disabled={!canUpgrade} onClick={upgrade} role="secondary">
      <b>BUY x{multiplier}</b>
      <BouncyLabel>{business.level}</BouncyLabel>
      <b>{formatCurrency(price)}</b>
    </TileButton>
  )
}

export default UpgradeButton

/**
 * Calculate the number of levels upgraded and the total price of the operation
 * based on the upgrade multiplier and available capital.
 */
function resolveMultiplier(
  currentPrice: number,
  capital: number,
  multiplier: Model.UpgradeMultiplier
): { multiplier: number; price: number } {
  const calculatePrice = (targetMultiplier: number) => {
    let price = currentPrice
    let result = price
    for (let index = 1; index < targetMultiplier; index++) {
      price *= Model.PRICE_LEVEL_MULTIPLIER
      result += price
    }
    return Math.round(result)
  }

  // If multiplier is a number, simply apply it:
  if (typeof multiplier === 'number') {
    return { multiplier, price: calculatePrice(multiplier) }
  }

  // Otherwise calculate max available upgrades:
  let maxMultiplier = 1
  while (calculatePrice(maxMultiplier + 1) <= capital) {
    maxMultiplier += 1
  }
  return { multiplier: maxMultiplier, price: calculatePrice(maxMultiplier) }
}
