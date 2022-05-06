import { useState } from 'react'
import axios from 'axios'

export default function useCurrency() {
  const [coinData, setCoinData] = useState('')
  const [coinChart, setCoinChart] = useState('')
  const [isFetching, setIsFetching] = useState(true)

  const fetchData = async (coinId1, coinId2) => {
    setIsFetching(true)
    try {
      const data = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${coinId2}&ids=${coinId1}&order=market_cap_desc&sparkline=false&price_change_percentage=14d`
      )
      const chart14days = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId1}/market_chart?vs_currency=${coinId2}&days=14&interval=daily`
      )
      setCoinData(data.data)
      setCoinChart(chart14days.data)
      setIsFetching(false)
    } catch (err) {
      console.log(err.message)
    }
  }
  return {
    coinData,
    coinChart,
    fetchData,
    isFetching,
  }
}
