// My Button

export function MyButton({ onClick, h, text, primary }) {
  const baseStyle = `bg-indigo-600  w-${3 * h || 'fit'} h-${
    h || 'fit'
  } hover:bg-indigo-600 transition-colors duration-300`
  const primaryStyle =
    'px-4 py-2 outline-none rounded text-white shadow-indigo-200 font-medium'.concat(
      ' ',
      baseStyle
    )

  const secondaryStyle =
    'px-3 py-1 bg-opacity-10 border-2 border-indigo-600 rounded-2xl text-indigo-600 font-semibold hover:text-snow'.concat(
      ' ',
      baseStyle
    )

  return (
    <button
      className={primary ? primaryStyle : secondaryStyle}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
