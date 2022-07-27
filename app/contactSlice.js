// TODO: manage the fetch/edit/update/delete logic of contacts here.

import { createSlice } from '@reduxjs/toolkit'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import { deepEqual } from 'assert'
import qs from 'qs'

export const emptyProfile = (address, isOneHop, avatar, name, notes, dev) => ({
  bio: {
    name: name || '',
    address: address || '',
    avatar: avatar || '/blocqBookLogo/icon/blocqbookTransparent2.png',
    notes: notes || '',
  },
  isSelf: false,
  isOneHop: isOneHop || false,
  tags: {
    privTags: dev ? [{ id: 1, name: 'myContact', color: 'cyan-300' }, { id: 11, name: 'blocqDev', color: 'violet-300' },] : [{ id: 1, name: 'myContact', color: 'cyan-300' },],
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

const devNote = `Hi 🤗 I am one of the 🌳 Developers who made the BlocqBook. Hope you njoyyy and would love to hear your feedBacq! Shoot me a text in the messenger 📩`

function devContacts() {
  const wolf = emptyProfile('0x3ECC53F7Ba45508483379bd76989A3003E6cbf09', false, 'https://avatars.githubusercontent.com/u/25290565?v=4', 'Wolf', devNote, true)
  const julian = emptyProfile('0x95aB35f379E84C44FE8668Eb158F2C90F6F150b9', false, 'https://avatars.githubusercontent.com/u/83669055?v=4', 'Julian', devNote, true)
  const reshma = emptyProfile('0xd9a51042eBE9A428e362B36F12Bd332bB565deEa', false, 'https://avatars.githubusercontent.com/u/70228821?v=4', 'Reshma', devNote, true)

  return {
    '0x3ECC53F7Ba45508483379bd76989A3003E6cbf09': wolf,
    '0x95aB35f379E84C44FE8668Eb158F2C90F6F150b9': julian,
    '0xd9a51042eBE9A428e362B36F12Bd332bB565deEa': reshma,
  }
}

const initialState = {
  // is the modal open
  modalOpen: false,
  // the address of the contact in the modal
  addressModal: null,
  // the contact in the open modal
  contactInEdit: null,
  // is the contact in the modal already a contact
  contactInEditExists: false,
  // did the contact in the open modal change
  isUpdated: false,
  // the phonebook
  contacts: {},
  // if the initial data is read from ceramic record
  hasInitialRecord: false,
  // are the contacts synced with ceramic record
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
      // if the contacts are empty, populate with the profiles of the devs
      if (Object.keys(action.payload.contacts).length === 0) {
        state.contacts = Object.assign(state.contacts, devContacts())
      } else {
        state.contacts = action.payload.contacts
        
      }
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
    deleteContact: (state, action) => {
      // delete a contact
      delete state.contacts[action.payload.address]
      state.isSyncedCeramic = false
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
  deleteContact,
  reset,
} = contactSlice.actions

export default contactSlice.reducer
