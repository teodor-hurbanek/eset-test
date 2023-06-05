import React from 'react'

const TextArea = ({ value, onChange, required = false, rows = 1 }) => {
  return (
    <textarea
      className="bg-gray-200 text-black p-2 w-full"
      rows={rows}
      value={value}
      onChange={onChange}
      required={required}
    ></textarea>
  )
}

export default TextArea
