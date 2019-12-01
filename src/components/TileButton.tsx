import React from 'react'
import './TileButton.css'

interface Props extends React.HTMLProps<HTMLDivElement> {
  role?: 'primary' | 'secondary' | 'tertiary'
  children?: React.ReactNode
  disabled?: boolean
  progress?: boolean
}

const TileButton: React.FC<Props> = props => {
  const { role, children, disabled, progress, ...rest } = props

  const className = `TileButton TileButton-${role || 'primary'} ${
    disabled ? 'TileButton-disabled' : ''
  } ${progress ? 'TileButton-progress' : ''}`

  return (
    <div {...rest} className={className}>
      {children}
    </div>
  )
}

export default TileButton
