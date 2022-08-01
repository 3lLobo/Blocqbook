import { Slice } from './ContactSlice'
import { useDispatch, useSelector } from 'react-redux'
import { emptyProfile } from '../../app/contactSlice'
import { v4 } from 'uuid'

export const ContactSlices = ({ setSelectedIndex }) => {
  const store = useSelector((state) => state.contact)

  const contacts = store.contacts ? Object.values(store.contacts) : []

  return (
    <div className=" w-full place-items-center">
      {contacts
        // sort alphabetically
        ?.sort((a, b) => a.bio.name.localeCompare(b.bio.name))
        .map((contact) => {
          return (
            <div key={v4()}>
              <Slice contact={contact} />
            </div>
          )
        })}
    </div>
  )
}
