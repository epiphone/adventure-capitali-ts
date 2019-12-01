import React, { useEffect, useState } from 'react'
import './BouncyLabel.css'

/**
 * Label that displays a bounce animation when its contents change.
 */
const BouncyLabel: React.FC = props => {
  const [isAnimating, setIsAnimating] = useState(false)
  useEffect(() => setIsAnimating(true), [props.children])

  return (
    <b
      className={`BouncyLabel ${isAnimating ? 'BouncyLabel-animate' : ''}`}
      onAnimationEnd={() => setIsAnimating(false)}
    >
      {props.children}
    </b>
  )
}

export default BouncyLabel
