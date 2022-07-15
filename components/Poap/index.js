import { useEffect } from 'react'
import { useGetPoapsQuery } from '../../app/poapApi'

const Poap = ({ address }) => {
  const { data, error, isLoading } = useGetPoapsQuery('pablito.eth')
  useEffect(() => {
    if (!isLoading) {
      console.log('data:', data)
    }
    if (error) {
      console.log(error)
    }
  }, [isLoading])

  return (
    <div>
      {data && (
        <div className=''>
          {data.map((d, index) => (
            <div key={index} className="w-80 bg-white flex flex-col items-center mt-2 p-2 rounded-md">
              <p className='text-center'>{d.event.name}</p>
              <img className="w-32 mt-2" src={d.event.image_url} alt="" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Poap
