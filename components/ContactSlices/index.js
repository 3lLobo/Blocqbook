import { Slice } from './contactSlice'
import { useDispatch, useSelector } from 'react-redux'

export const ContactSlices = () => {
  const store = useSelector((state) => state.contact)

  const contacts = Object.values(store.contacts)

  return (
    <div className=" w-full place-items-center">
      {contacts?.map((contact) => {
        return <Slice key={contact.address} contact={contact} />
      })}
    </div>
  )
}
