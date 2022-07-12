import { Avatar } from './Avatar'

const ProfileCard = () => {
  return (
    <div
      borderRadius="md"
      className="border-2 self-center grid justify-items-center m-8 p-4 shadow-lg"
    >
      <div className="w-40 pb-4">
        <Avatar w="60" scale={110} />
      </div>

      <div className="text-black text-2xl dark:text-indigo-50 pb-2">
        {' '}
        CryptoPanda{' '}
      </div>
      <div className="ml-3 px-2 py-1 bg-indigo-500 bg-opacity-80 rounded-tr-xl rounded-bl-xl text-snow text-xs hover:text-snow-muted hover:text-semibold  hover:bg-indigo-600 transition-colors duration-300 truncate">
        0xd9a51042eBE9A428e362B36F12Bd332bB565deEa
      </div>
      <div className="text-slate-900 text-semibold text-xl dark:text-snow p-6">
        {' '}
        About me
      </div>
      <div
        // className="mt-1"
        className="prose backdrop-blur-xl dark:backdrop-brightness-110 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex flex-grow w-full sm:text-sm border-slate-300 rounded-xl"
      >
        <textarea
          className="dark:text-snow bg-transparent border-0 rounded-xl p-3 form-textarea flex flex-grow resize-none"
          rows="4"
          name="comment"
          id="comment"
          placeholder="Add your comment ..."
        ></textarea>
      </div>
      {/* <div className="flex-shrink-0 pt-4">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div> */}
    </div>
  )
}

export default ProfileCard
