import { useState, useEffect } from 'react'
import { Input, Select, Spin, Button } from 'antd'
import { BiRightArrow } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import '../styles/converter.css'
import useCurrency from '../hooks/useCurrency'
import CoinChart from '../components/CoinChart'

export default function Converter() {
  const [coinId1, setCoinId1] = useState('bitcoin')
  const [coinId2, setCoinId2] = useState('usd')
  const [inputValue, setInputValue] = useState(1)
  const { coinData, coinChart, fetchData, isFetching } = useCurrency()
  const navigate = useNavigate()

  const { Option } = Select

  const selectHandler = (option, value) => {
    option === 1 && setCoinId1(value)
    option === 2 && setCoinId2(value)
  }
  useEffect(() => {
    fetchData(coinId1, coinId2)
  }, [coinId1, coinId2])

  return (
    <div className='converter'>
      <Button onClick={() => navigate('/assets')} className='navigateBtn'>
        To assets
      </Button>
      <div>
        <Select
          disabled={isFetching}
          defaultValue='bitcoin'
          onChange={(value) => selectHandler(1, value)}
        >
          <Option value='bitcoin'>BTC</Option>
          <Option value='ethereum'>ETH</Option>
          <Option value='1-dollar'>USD</Option>
        </Select>
        <BiRightArrow />
        <Select
          disabled={isFetching}
          defaultValue='usd'
          onChange={(value) => selectHandler(2, value)}
        >
          <Option value='usd'>USD</Option>
          <Option value='btc'>BTC</Option>
          <Option value='eth'>ETH</Option>
        </Select>
      </div>
      <Input
        type='number'
        placeholder='Quantity'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {!isFetching ? (
        <div className='chartWrapper'>
          <h1>
            {coinData[0]?.current_price * inputValue}
            {'  '}
            {coinId2.toLocaleUpperCase()}
          </h1>
          <CoinChart
            chartData={coinChart}
            coinId2={coinId2}
            coinData={coinData}
          />
        </div>
      ) : (
        <div className='chartWrapper'>
          <Spin />
        </div>
      )}
    </div>
  )
}
