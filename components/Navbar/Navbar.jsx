'use client'

import React from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'

const Navbar = () => {
  const handleScrollToTop = () => {
    const top = document.getElementById('main')
    top.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="w-full bg-emerald-700 p-5 fixed z-10 flex justify-between">
      <h1 onClick={handleScrollToTop} title="Scroll to top" className="cursor-pointer">
        Fakebook
      </h1>
      <div className="flex items-center gap-2">
        <NotificationsNoneIcon />
        <PermIdentityOutlinedIcon />
      </div>
    </div>
  )
}

export default Navbar
