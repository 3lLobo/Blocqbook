import { useGetPoapsQuery } from "../../app/poapApi"

const Poap = () => {
    const { data, error, isLoading} = useGetPoapsQuery("pablito.eth")
    console.log('data:', data);
  return (
    <div>Poap</div>
  )
}

export default Poap