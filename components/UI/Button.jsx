import React from 'react'

const Button = ({ type = 'button', style = undefined, disabled = undefined, children, onClick = undefined }) => {
  return (
    <button
      onClick={onClick}
      className="py-2 px-4 w-full text-center bg-emerald-700 hover:bg-emerald-600"
      style={style}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
