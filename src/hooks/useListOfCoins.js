import { useState, useEffect } from 'react'
import axios from 'axios'

export default function () {
  const [isFetching, setIsFetching] = useState(true)
  const [listOfCoins, setListOfCoins] = useState([])

  const fetchListOfCoins = async () => {
    setIsFetching(true)
    try {
      const data = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      setListOfCoins(data.data)
      setIsFetching(false)
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    fetchListOfCoins()
  }, [])
  return { isFetching, fetchListOfCoins, listOfCoins }
}
