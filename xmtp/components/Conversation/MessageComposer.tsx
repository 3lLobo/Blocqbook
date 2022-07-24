import React, { useCallback, useEffect, useState } from 'react'
import classNames from '../../helpers/classNames'
import messageComposerStyles from '../../styles/MessageComposer.module.css'
import { useRouter } from 'next/router'

type MessageComposerProps = {
  onSend: (msg: string) => Promise<void>
}

const MessageComposer = ({ onSend }: MessageComposerProps): JSX.Element => {
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => setMessage(''), [router.query.recipientWalletAddr])

  const onMessageChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => setMessage(e.currentTarget.value),
    []
  )

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!message) {
        return
      }
      setMessage('')
      await onSend(message)
    },
    [onSend, message]
  )
  return (
    <div
      className={classNames(
        'sticky',
        'bottom-0',
        'pl-4',
        'mb-4',
        'pt-2',
        'flex-shrink-0',
        'flex',
        'h-[68px]',
        'bg-white'
      )}
    >
      <form
        className={classNames(
          'flex',
          'w-full',
          'border',
          'py-2',
          'pl-4',
          'mr-3',
          messageComposerStyles.bubble
        )}
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          placeholder="Type something..."
          className={classNames(
            'block',
            'w-full',
            'text-md',
            'md:text-sm',
            messageComposerStyles.input
          )}
          name="message"
          value={message}
          onChange={onMessageChange}
          required
        />
        <button type="submit" className={messageComposerStyles.arrow}>
          {message ? (
            <svg
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13 25.7999C20.0693 25.7999 25.8 20.0692 25.8 13C25.8 5.93071 20.0693 0.199951 13 0.199951C5.93077 0.199951 0.200012 5.93071 0.200012 13C0.200012 20.0692 5.93077 25.7999 13 25.7999ZM18.9314 11.8686L14.1314 7.06858C13.5065 6.44374 12.4935 6.44374 11.8686 7.06858L7.06864 11.8686C6.4438 12.4934 6.4438 13.5065 7.06864 14.1313C7.69348 14.7562 8.70654 14.7562 9.33138 14.1313L11.4 12.0627L11.4 17.8C11.4 18.6836 12.1164 19.4 13 19.4C13.8837 19.4 14.6 18.6836 14.6 17.8V12.0627L16.6686 14.1313C17.2935 14.7562 18.3065 14.7562 18.9314 14.1313C19.5562 13.5065 19.5562 12.4934 18.9314 11.8686Z"
                fill="#2EC053"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13 25.7999C20.0693 25.7999 25.8 20.0692 25.8 13C25.8 5.93071 20.0693 0.199951 13 0.199951C5.93077 0.199951 0.200012 5.93071 0.200012 13C0.200012 20.0692 5.93077 25.7999 13 25.7999ZM18.9314 11.8686L14.1314 7.06858C13.5065 6.44374 12.4935 6.44374 11.8686 7.06858L7.06864 11.8686C6.4438 12.4934 6.4438 13.5065 7.06864 14.1313C7.69348 14.7562 8.70654 14.7562 9.33138 14.1313L11.4 12.0627V17.7999C11.4 18.6836 12.1164 19.4 13 19.4C13.8837 19.4 14.6 18.6836 14.6 17.7999V12.0627L16.6686 14.1313C17.2935 14.7562 18.3065 14.7562 18.9314 14.1313C19.5562 13.5065 19.5562 12.4934 18.9314 11.8686Z"
                fill="#989CA7"
              />
            </svg>
          )}
        </button>
      </form>
    </div>
  )
}

export default MessageComposer
