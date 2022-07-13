export function BezierSpinner({ text, radius }) {
  return (
    <div className={`flex w-${radius} h-${radius}`}>
      <div
        className={`flex flex-grow border-indigo-500 rounded-full border-b-4 border-double animate-spin-bezier transform-gpu`}
      />
      {/* {text && <p className="text-aqua text-xs font-bold mt-2">{text}</p>} */}
    </div>
  )
}
