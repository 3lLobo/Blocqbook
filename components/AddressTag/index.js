// A tag which displays the address af a wallet.

import { useDispatch, useSelector } from 'react-redux'
import { closeModal, openModal } from '../../app/contactSlice'

export const AddressTag = ({ address, isOneHop }) => {
  const store = useSelector((state) => state.contact)
  const dispatch = useDispatch()

  const contactName = Object.keys(store.contacts).includes(address)
    ? store.contacts[address].bio?.name
    : address

  function onClick() {
    dispatch(
      openModal({
        address,
        isOneHop: isOneHop || false,
      })
    )
  }

  return (
    <div
      title={address}
      onClick={onClick}
      className="ml-3 px-2 py-1 bg-indigo-500 shadow-lg bg-opacity-80 rounded-tr-xl rounded-bl-xl font-medium text-center text-snow text-xs hover:text-snow-muted hover:cursor-pointer hover:bg-neonPurple transition-colors duration-500 truncate w-fit"
    >
      {contactName}
    </div>
  )
}
