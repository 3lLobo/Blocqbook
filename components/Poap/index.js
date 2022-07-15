import { useGetPoapsQuery } from '../../app/poapApi'

const Poap = ({ address }) => {
  const { data, error, isLoading } = useGetPoapsQuery(address)

  if (isLoading) return <div className='bg-white'>Loading...</div>
  if (error) return <div className='bg-white'>{error.data.message}</div>
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
