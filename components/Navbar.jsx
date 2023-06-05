'use client'

import React from 'react'

const Navbar = () => {
  const handleScrollToTop = () => {
    const top = document.getElementById('main')
    top.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      onClick={handleScrollToTop}
      className="w-full bg-emerald-700 p-5 fixed z-10 cursor-pointer"
      title="Scroll to top"
    >
      Fakebook
    </div>
  )
}

export default Navbar
