import React, { forwardRef } from 'react'

const Input = forwardRef(({ type, value, onChange, required = false }, ref) => {
  return (
    <input
      ref={ref}
      className="p-2 bg-black border"
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    />
  )
})

export default Input
