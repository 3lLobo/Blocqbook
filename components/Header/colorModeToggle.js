import { useEffect } from 'react'
// import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5'
import { SunIcon, MoonIcon } from '@heroicons/react/solid'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../../app/themeSlice'

export function ColorModeToggle() {
  const store = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  // When changing pages the element gets lost. We check if it needs to be rewritten
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (store.mode === 'dark') {
      document?.documentElement.classList.add('dark')
    } else {
      document?.documentElement.classList.remove('dark')
    }
  }, [store.mode])

  // Toggle for tailwind. Src https://tailwindcss.com/docs/dark-mode
  function toggleButtonClick() {
    dispatch(toggleTheme())
  }

  const iconStyle = 'h-4 w-4 text-snow fill-snow '
  return (
    <div className="flex flex-grow color-snow hover:scale-110 transition ease-in-out duration-500">
      <button
        className="dark:bg-indigo-600 bg-indigo-300 rounded-full border-2 dark:border-indigo-600 p-2"
        // bg="blueviolet"
        onClick={toggleButtonClick}
        aria-label="Toggle"
      >
        {store.mode === 'light' ? (
          <SunIcon className={iconStyle} />
        ) : (
          <MoonIcon className={iconStyle} />
        )}
      </button>
    </div>
  )
}
