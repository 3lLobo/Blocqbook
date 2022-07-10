// My Button

export function MyButton({ onClick, h, text, primary }) {
  const primaryStyle =
    'px-4 py-2 bg-indigo-600 outline-none rounded text-white shadow-indigo-200 font-medium hover:bg-indigo-600 transition-colors duration-200'

  const secondaryStyle =
    'px-3 py-1 bg-indigo-600 bg-opacity-10 border-2 border-indigo-600 rounded-2xl text-indigo-600 font-semibold  hover:bg-indigo-600 hover:text-snow transition-colors duration-300'

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
