import { useSelector } from 'react-redux'


export const useAddressName = ({ address }) => {
  const store = useSelector((state) => state.contact)

  const contactName = Object.keys(store.contacts).includes(address)
    ? store.contacts[address].bio?.name
    : address

  return contactName
}
