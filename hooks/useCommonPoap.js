import { useEffect, useState } from 'react'
import { useGetPoapsQuery } from '../app/poapApi'
import { useDispatch, useSelector } from 'react-redux'
import { updateContact } from '../app/contactSlice'

export const useCommonPoap = ({ address, doUpdate }) => {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.evm)
  const [commonPoaps, setCommonPoaps] = useState([])

  // fetch poaps
  const {
    data: poapData,
    loading: poapLoading,
    error: poapError,
  } = useGetPoapsQuery(
    address
      ? {
          address: address,
        }
      : skipToken,
    {
      pollingInterval: 300_000,
    }
  )

  useEffect(() => {
    if (poapData) {
      const poaps = poapData.map((poap) => {
        return poap.event.id
      })
      const iou = poaps.filter((poap) => {
        if (store.poaps.includes(poap)) {
          return poap
        }
      })
      setCommonPoaps(() => iou)
      if (doUpdate) {
        const hasCommon = iou.length > 0 ? true : false
        dispatch(
          updateContact({ field1: 'poap', field2: 'poaps', value: poapData })
        )
        dispatch(
          updateContact({
            field1: 'poap',
            field2: 'hasCommonPoap',
            value: hasCommon,
          })
        )
      }
    }
  }, [poapData, store.poaps])

  return { commonPoaps, poapData, poapLoading, poapError }
}
