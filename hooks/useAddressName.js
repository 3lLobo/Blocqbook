import { ethers } from 'ethers'
import { useSelector } from 'react-redux'

export const useAddressName = ({ address }) => {
  const store = useSelector((state) => state.contact)

  // addresses come in lowercase
  const addressList = Object.keys(store.contacts)

  var addressCased
  if (!isLowerCase(address))
    addressCased = address.toLowerCase()
  else {
    addressCased = ethers.utils.getAddress(address)
  }


  var contactName

  if (addressList.includes(address)) {
    contactName = store.contacts[address].bio?.name
  } else if (addressList.includes(addressCased)) {
    contactName = store.contacts[addressCased].bio?.name
  } else {
    contactName = address
  }

  return contactName
}


function isLowerCase(str) {
  return str == str.toLowerCase() && str != str.toUpperCase();
}