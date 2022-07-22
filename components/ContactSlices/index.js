import { Slice } from './ContactSlice'
import { useDispatch, useSelector } from 'react-redux'
import { emptyProfile } from '../../app/contactSlice'

export const ContactSlices = () => {
  const store = useSelector((state) => state.contact)

  const contacts = store.contacts ? Object.values(store.contacts) : []

  return (
    <div className=" w-full place-items-center">
      {contacts?.map((contact) => {
        return <Slice key={contact.address} contact={contact} />
      })}
    </div>
  )
}
