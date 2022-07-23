import { Slice } from './ContactSlice'
import { useDispatch, useSelector } from 'react-redux'
import { emptyProfile } from '../../app/contactSlice'

export const ContactSlices = ({setSelectedIndex}) => {
  const store = useSelector((state) => state.contact)

  const contacts = store.contacts ? Object.values(store.contacts) : []

  return (
    <div className=" w-full place-items-center">
      {contacts
        ?.sort((a, b) => a.bio.name + b.bio.name)
        .map((contact) => {
          return <Slice key={contact.address} setSelectedIndex={setSelectedIndex} contact={contact} />
        })}
    </div>
  )
}
