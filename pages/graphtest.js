import { useEffect } from "react"
import ContactSlice, { devContacts } from "../app/contactSlice"
import { useGetTagsQuery } from "../app/thegraphApi"
import { AddressTag } from "../components/AddressTag"
import { Slice } from "../components/ContactSlices/ContactSlice"
import { ColorModeToggle } from "../components/Header/colorModeToggle"
import { PubTags } from "../components/Profile/PubTags"
import ProfileModal from "../components/ProfileModal"


export default function Graphtest() {
  const testAdrs = '0x1bca0600f48fbf09aee9b6c7279c31311da11bac'
  // const { data, error, isLoading } = useGetTagsQuery({ address: testAdrs })
  const myContact = devContacts()["0x3ECC53F7Ba45508483379bd76989A3003E6cbf09"]


  return (
    <div>

      <div
        className="flex flex-col flex-1 items-center justify-evenly h-screen bg-violet-300">
        <ProfileModal />
        <ColorModeToggle />
        <h1>Graph Test</h1>
        <Slice contact={myContact} />
        <AddressTag address={testAdrs} isOneHop={true} />
        {/* <PubTags /> */}
        {/* {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {data &&
          <div>
            Success: <br />
            {data.map((tag) => (
              <div key={tag.name}>
                <span>
                  {JSON.stringify(tag)}
                </span>
              </div >
            ))}

          </div>
        } */}
        <div
          className=" justify-self-center align-bottom">
          Footer
        </div>
      </div>
    </div>
  )
}
