// TODO: manage the fetch/edit/update/delete logic of contacts here.

import { createSlice } from '@reduxjs/toolkit'


const emptyProfile = (address, isOneHop) => ({
  bio: {
    name: '',
    address: address || '',
    avatar:
      'https://pbs.twimg.com/profile_images/12098984010/CryptoPanda_400x400.jpg',
    notes: '',
  },
  isSelf: false,
  isOneHop: isOneHop || false,
  tags: {
    privTags: [],
    pubTags: [],
  },
  poap: {
    hasCommonPoap: false,
    poaps: [],
  },
  xmltChat: {
    isChat: false,
    chatId: '',
    chatData: [],
  },
  fileTransfer: {
    isTransfer: false,
    transferData: [],
  },
})

const initialState = {
  modalOpen: false,
  addressModal: null,
  contactInEdit: null,
  isUpdated: false,
  contacts: {},
  contactList: [],
  contactNames: {},
  hasInitialRecord: false,
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    openModal: (state, action) => {
      // When the profilecard modalis opened, we either fetch the existing contact or build the initial structure.
      state.modalOpen = action.payload.modalOpen
      state.addressModal = action.payload.address
      if (state.contactList.contains(action.payload.address)) {
        state.contactInEdit = state.contacts[action.payload.address]
      } else {
        state.contactInEdit = emptyProfile({ address: action.payload.address, isOneHop: action.payload.isOneHop })
      }
    },
    setContacts: (state, action) => {
      state.contacts = action.payload.contacts
      state.contactList = []
      state.contactNames = {}
      Object.keys(state.contacts).forEach((contact) => {
        state.contactList.push(contact)
        state.contactNames[contact] = action.payload.contacts[contact].bio.name
      }
      )
      // check if we already loaded data from the record
      if (action.payload.isInitialRecord) {
        state.hasInitialRecord = true
      }
    },
    updateContact: (state, action) => {
      // update a field of the contact
      if (['bio', 'tags', 'poap', 'xmltChat', 'fileTransfer'].includes(action.payload.field1)) {
        state.contactInEdit[action.payload.field1][action.payload.field2] = action.payload.value
      } else {
        state.contactInEdit[action.payload.field1] = action.payload.value
      }
      state.isUpdated = true
    },
    reset: () => initialState,
  }
})

export const { openModal, setContacts, updateContact, reset } = contactSlice.actions

export default contactSlice.reducer