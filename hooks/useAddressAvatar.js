import { useSelector } from 'react-redux'

export const useAddressAvatar = ({ address }) => {
  const store = useSelector((state) => state.contact)

  const contactAvatar = Object.keys(store.contacts).includes(address)
    ? store.contacts[address].bio?.avatar
    : null

  return contactAvatar
}
