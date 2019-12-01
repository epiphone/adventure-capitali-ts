import React from 'react'
import * as Model from '../../Model'

interface Props {
  dispatch: Model.Dispatch
  state: Model.State
  index: number
}

const UpgradeButton: React.FC<Props> = ({ state, dispatch, index }) => {
  const { capital, upgradeMultiplier } = state
  const business = state.businesses[index]

  const { multiplier, price } = resolveMultiplier(
    business.price,
    capital,
    upgradeMultiplier
  )
  const canUpgrade = capital >= business.price

  function upgrade() {
    if (canUpgrade) {
      dispatch({ type: 'upgrade-business', index, multiplier, price })
    }
  }

  return (
    <button disabled={!canUpgrade} onClick={upgrade}>
      Upgrade x{multiplier} ${price}
    </button>
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
