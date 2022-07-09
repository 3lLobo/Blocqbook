// My Button

export function MyButton({ onClick, h, text, primary }) {
  const primaryStyle =
    'px-4 py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium hover:bg-indigo-600 transition-colors duration-200'

  const secondaryStyle =
    'px-3 py-0 bg-aqua-muted bg-opacity-0 border-2 border-aqua-muted rounded-xl text-aqua-muted hover:text-snow font-semibold  hover:bg-opacity-50 transition-colors duration-700'

  return (
    <div className={`color-snow  w-${3 * h} h-${h}`}>
      <button
        className={primary ? primaryStyle : secondaryStyle}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  )
}
