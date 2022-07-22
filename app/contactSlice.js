// TODO: manage the fetch/edit/update/delete logic of contacts here.

import { createSlice } from '@reduxjs/toolkit'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import { deepEqual } from 'assert'
import qs from 'qs'

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
    privTags: [{ id: 1, name: 'myContact', color: 'cyan-300' }],
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
  contactInEditExists: false,
  isUpdated: false,
  contacts: {},
  hasInitialRecord: false,
  isSyncedCeramic: false,
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    openModal: (state, action) => {
      console.log('Open modal: ', action)
      // When the profile card modal is opened, we either fetch the existing contact or build the initial structure.
      if (Object.keys(state.contacts).includes(action.payload.address)) {
        state.contactInEdit = state.contacts[action.payload.address]
        state.contactInEditExists = true
      } else {
        const newProfile = emptyProfile(
          action.payload.address,
          action.payload.isOneHop
        )
        state.contactInEdit = newProfile
      }
      state.modalOpen = true
      state.addressModal = action.payload.address
    },
    closeModal: (state, action) => {
      state.modalOpen = false
      // Check if the contact in edit is different from the empty profile.
      // If so, we need to update the contact in the store.
      if (action.payload.saveContact) {
        state.contacts[state.addressModal] = state.contactInEdit
        state.isSyncedCeramic = false
        console.log('Contact updated!')
      } else {
        console.log('Contact not saved!')
      }
      state.addressModal = null
      state.contactInEdit = null
      state.contactInEditExists = false
      state.isUpdated = false
    },
    setContacts: (state, action) => {
      state.contacts = action.payload.contacts
      // check if we already loaded data from the record
      if (action.payload.isInitialRecord) {
        state.hasInitialRecord = true
        state.isSyncedCeramic = true
      }
    },
    updateContact: (state, action) => {
      // update a field of the contact
      // Depending on how many arguments the payload has, we know how deeply nested the update field lays.
      if (Object.keys(action.payload).length === 3) {
        state.contactInEdit[action.payload.field1][action.payload.field2] =
          action.payload.value
      } else if (Object.keys(action.payload).length === 2) {
        state.contactInEdit[action.payload.field1] = action.payload.value
      } else {
        console.error('Invalid payload for updateContact!')
        return
      }
      state.isUpdated = true
    },
    setSyncedCeramic: (state, action) => {
      state.isSyncedCeramic = action.payload.isSyncedCeramic
    },
    reset: () => initialState,
  },
})

export const {
  openModal,
  closeModal,
  setContacts,
  updateContact,
  setSyncedCeramic,
  reset,
} = contactSlice.actions

export default contactSlice.reducer
