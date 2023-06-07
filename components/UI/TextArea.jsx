import React, { forwardRef } from 'react'

const TextArea = forwardRef(
  (
    { value, onChange, placeholder = undefined, required = false, style = undefined, className = '', rows = 1 },
    ref
  ) => {
    return (
      <textarea
        className={'bg-gray-200 text-black p-2 w-full ' + className}
        placeholder={placeholder}
        ref={ref}
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
        style={{ resize: 'none', ...style }}
      ></textarea>
    )
  }
)

export default TextArea
