// My Button

export function MyButton({ onClick, h, text, primary }) {
  const primaryStyle =
    'px-4 py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium hover:bg-indigo-600 transition-colors duration-200'

  const secondaryStyle =
    'px-3 py-0 bg-indigo-100 bg-opacity-10 border-2 border-indigo-400 rounded-xl text-indigo-400 font-semibold  hover:bg-indigo-400 hover:text-snow transition-colors duration-300'

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
