import Image from 'next/image'
import Link from 'next/link'
import { useGetPoapsQuery } from '../../app/poapApi'
import { CommonCheck } from './CommonCheck'

export const PoapAvatar = ({ poapData, isCommon }) => {
  // TODO: comapre to own POAPS and mark as common
  return (
    <>
      <button
        className={`w-full h-full hover:scale-105 transition ease-in-out duration-300 transform-gpu`}
      >
        <div className="w-full h-full rounded-full shadow-xl outline-neonPurple outline outline-2">
          <Link href={poapData.event.event_url}>
            <Image
              className="rounded-full bg-indigo-400 dark:bg-neonPurple"
              layout="fill"
              src={poapData.event.image_url}
              alt="avatar"
              title={poapData.event.name}
            />
          </Link>
        </div>
        {isCommon && (
          <span className="absolute top-0 right-0 block h-1/4 w-1/4 rounded-full ring-2 ring-snow dark:ring-zinc-800 bg-neonPurple">
            <CommonCheck />
          </span>
        )}
      </button>
    </>
  )
}

// const Poap = ({ address }) => {
//   const { data, error, isLoading } = useGetPoapsQuery(address)

//   if (isLoading) return <div className="bg-white">Loading...</div>
//   if (error) return <div className="bg-white">{error.data.message}</div>
//   return (
//     <div>
//       {data && (
//         <div className="">
//           {data.map((d, index) => (
//             <div
//               key={index}
//               className="w-80 bg-white flex flex-col items-center mt-2 p-2 rounded-md"
//             >
//               <p className="text-center">{d.event.name}</p>
//               <img className="w-32 mt-2" src={d.event.image_url} alt="" />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
