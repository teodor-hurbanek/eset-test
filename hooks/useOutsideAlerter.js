// source: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

import { useEffect, useState } from 'react'

/**
 * Hook that alerts clicks outside of the passed ref
 */
export const useOutsideAlerter = ref => {
  const [clickOut, setClickOut] = useState(false)
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log('You clicked outside of me!')
        setClickOut(true)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  return clickOut
}
