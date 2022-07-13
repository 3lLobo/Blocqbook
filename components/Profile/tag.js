// Tag element which get's a random color for each new tag if no color is passed as props.

import { useEffect, useState } from "react"
import { getRandomTailwindColor } from "../../lib/randomColors"

export function Tag({ tagText, color }) {
  const bg = color ? 'bg-' + color : 'bg-' + getRandomTailwindColor()

  return (
    <div className={bg + ' mx-auto w-fit rounded-bl-xl rounded-tr-xl px-2 py-1 shadow-lg '}>
      <div className=" text-snow-muted font-semibold text-center text-sm">{tagText}</div>
    </div>
  )
}

