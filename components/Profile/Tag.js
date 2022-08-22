// Tag element which get's a random color for each new tag if no color is passed as props.

import { useEffect, useState } from 'react'
import { getRandomTailwindColor } from '../../lib/randomColors'

// isPub flag used to indicate that this flag was not given by the user but fetched from the database. If the user also decides to give that tag, the flag should be set to false.
// TODO: add a little number on top of the tag to indicate the count of the tag.
export function Tag({ tagText, color, isPub, count }) {
  const bg = color ? 'bg-' + color : 'bg-' + getRandomTailwindColor()
  const opa = isPub ? 'opacity-50' : 'opacity-100'

  return (
    <div
      className={
        bg +
        ' relative inline-block w-fit h-fit rounded-bl-xl rounded-tr-xl px-2 mr-1 mt-3.5 py-1 shadow-lg dark:brightness-75 text-snow-muted dark:text-zinc-900 ' +
        opa
      }
    >
      <div className="font-semibold text-center text-sm ">{tagText}</div>
      {count > 0 && (
        <span
          className={'absolute top-0 right-0 block w-5 h-5 transform -translate-y-2/3 translate-x-1/4 rounded-full aspect-1 ring-4 ring-snow dark:ring-slate-900 group-hover:ring-blocqpurple dark:group-hover:ring-indigo-500 hover:transition-color hover:duration-500 hover:scale-105 transition-transform ease-in-out justify-items-center '.concat(
            ' ',
            bg
          )}
        >
          <div
            className="text-xs font-semibold text-center pt-1  text-zinc-900 self-center"
            title={`This wallet was tagged ${count} times with "${tagText}".`}
          >
            {count}
          </div>
        </span>
      )}
    </div>
  )
}
