// Tag element which get's a random color for each new tag if no color is passed as props.

import { useEffect, useState } from 'react'
import { getRandomTailwindColor } from '../../lib/randomColors'

// isPub flag used to indicate that this flag was not given by the user but fetched from the database. If the user also decides to give that tag, the flag should be set to false.
// TODO: add a little number on top of the tag to indicate the count of the tag.
export function Tag({ tagText, color, isPub }) {
  const bg = color ? 'bg-' + color : 'bg-' + getRandomTailwindColor()
  const opa = isPub ? 'opacity-50' : 'opacity-100'

  return (
    <div
      className={
        bg +
        ' w-fit h-fit rounded-bl-xl rounded-tr-xl px-2 py-1 shadow-lg dark:brightness-75 ' +
        opa
      }
    >
      <div className="text-snow-muted font-semibold text-center text-sm dark:text-zinc-900">
        {tagText}
      </div>
    </div>
  )
}
