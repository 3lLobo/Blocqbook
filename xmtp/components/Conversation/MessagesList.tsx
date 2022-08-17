import { Message } from '@xmtp/xmtp-js'
import React, { MutableRefObject } from 'react'
import Emoji from 'react-emoji-render'
import { formatTime } from '../../helpers/string'
import AddressPill from '../AddressPill'
import { AddressTag } from '../../../components/AddressTag'
import { useAddressAvatar } from '../../../hooks/useAddressAvatar.js'
import { PoapAvatar } from '../../../components/Poap'
import { Avatar } from '../../../components/Profile/Avatar'
import TimeAgo from 'timeago-react'

export type MessageListProps = {
  messages: Message[]
  walletAddress: string | undefined
  messagesEndRef: MutableRefObject<null>
  recipientWalletAddr: string
}

type MessageTileProps = {
  message: Message
  isSender: boolean
}

const isOnSameDay = (d1?: Date, d2?: Date): boolean => {
  return d1?.toDateString() === d2?.toDateString()
}

const formatDate = (d?: Date) =>
  d?.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const MessageFiltered = ({ message }) => {
  const messageObject = checkMessageType(message)
  switch (messageObject.type) {
    case 'text':
      return <div>{message.content}</div>
    case 'file':
      return (
        <div className="hover:scale-105 transition-all ease-in-out px-3 py-1 m-1 font-mono text-zinc-900 dark:text-zinc-300 bg-mybg-light dark:bg-mybg-dark text-xs rounded-md">
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://ipfs.io/ipfs/${messageObject.cid}`}
          >
            IPFS:
            {messageObject.description.toUpperCase()}
          </a>
        </div>
      )
    case 'media':
      return (
        <div>
          <img
            src={`https://ipfs.io/ipfs/${messageObject.cid}/media.${messageObject.extension}`}
            className="h-96"
          />
          <div>{messageObject.message}</div>
        </div>
      )
    default:
      return <div>Error</div>
  }
}

const checkMessageType = (message) => {
  //Instead of slicing we can directly parse and check but
  //I think this is faster
  const sliced = message.content.slice(0, 22)
  switch (sliced) {
    case '{"type":"media","cid":':
      return JSON.parse(message.content)
    case '{"type":"file","cid":"':
      return JSON.parse(message.content)
    default:
      return { type: 'text' }
      break
  }
}
const MessageTile = ({ message, isSender }: MessageTileProps): JSX.Element => {
  const savedAvatar = useAddressAvatar({
    address: message.senderAddress.toLowerCase(),
  })
  return (
    <div
      className={
        'flex justify-self-start w-full ' +
        (isSender ? 'flex-row-reverse' : 'flex-row ')
      }
    >
      {/* <div className="relative w-11 h-11 ">
        <Avatar src={savedAvatar} scale={0} />
      </div> */}
      <div className="ml-2">
        <div className="flex gap-1">
          {/**COVALENT IS BRINGING JUST LOWERCASE ADDRESSES */}
          {/* <AddressTag
            address={message.senderAddress.toLowerCase()}
          /> */}
          {/* <span className="flex overflowtext-sm font-normal place-self-end text-n-300 text-md uppercase">
            {formatTime(message.sent)}
          </span> */}
        </div>
        <span
          className={
            'block text-md px-2 my-1 text-zinc-900 dark:text-snow font-normal bg-zinc-500 rounded-full p-1 bg-opacity-30'
          }
        >
          {message.error ? (
            `Error: ${message.error?.message}`
          ) : (
            <div className="flex flex-row">
              <MessageFiltered message={message} />
              {/* <TimeAgo datetime={message.sent.toDateString()} /> */}
            </div>
          )}
        </span>
      </div>
    </div>
  )
}

const DateDividerBorder: React.FC = ({ children }) => (
  <>
    <div className="grow h-0.5 bg-gray-300/25" />
    {children}
    <div className="grow h-0.5 bg-gray-300/25" />
  </>
)

const DateDivider = ({ date }: { date?: Date }): JSX.Element => (
  <div className="flex align-items-center items-center pb-8 pt-4">
    <DateDividerBorder>
      <span className="mx-11 flex-none text-gray-300 text-sm font-bold">
        {formatDate(date)}
      </span>
    </DateDividerBorder>
  </div>
)

const ConversationBeginningNotice = ({ contact }): JSX.Element => (
  <div className="sticky top-4 flex flex-row w-fill justify-center pb-4">
    <span className="text-zinc-500 dark:text-zinc-400 text-md font-semibold">
      Conversation with
    </span>
    <AddressTag address={contact.toLowerCase()} />
  </div>
)

const MessagesList = ({
  messages,
  walletAddress,
  messagesEndRef,
  recipientWalletAddr,
}: MessageListProps): JSX.Element => {
  let lastMessageDate: Date | undefined

  return (
    <div className=" flex flex-col flex-initial bg-transparent px-4 pt-6 ">
      {messages && messages.length ? (
        <ConversationBeginningNotice contact={recipientWalletAddr} />
      ) : null}
      <div className="flex flex-col flex-nowrap ">
        {messages?.map((msg: Message) => {
          const isSender = msg.senderAddress === walletAddress
          const tile = (
            <MessageTile message={msg} key={msg.id} isSender={isSender} />
          )
          const dateHasChanged = !isOnSameDay(lastMessageDate, msg.sent)
          lastMessageDate = msg.sent
          return (
            <div className="inline-block">
              {dateHasChanged ? (
                <div key={msg.id}>
                  <DateDivider date={msg.sent} />
                  {tile}
                </div>
              ) : (
                tile
              )}
            </div>
          )
        })}
      </div>
      <div ref={messagesEndRef} />
    </div>
  )
}
export default React.memo(MessagesList)
