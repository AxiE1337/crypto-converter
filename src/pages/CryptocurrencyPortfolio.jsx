import { useState, useEffect } from 'react'
import PieChart from '../components/PieChart'
import { useNavigate } from 'react-router-dom'
import useListOfCoins from '../hooks/useListOfCoins'
import { Spin, Button } from 'antd'
import '../styles/cryptoPortfolio.css'

export default function CryptocurrencyPortfolio() {
  const navigate = useNavigate()
  const { listOfCoins, isFetching } = useListOfCoins()
  const [myAssets, setMyAssets] = useState([])
  let total = 0
  for (let i of myAssets) {
    total += i?.price * i?.quantity
  }

  useEffect(() => {
    !isFetching &&
      setMyAssets([
        {
          id: 'bitcoin',
          name: 'Bitcoin',
          quantity: 1,
          price: listOfCoins.find(({ id }) => id === 'bitcoin')?.current_price,
        },
        {
          id: 'ethereum',
          name: 'Ethereum',
          quantity: 4,
          price: listOfCoins.find(({ id }) => id === 'ethereum')?.current_price,
        },
      ])
  }, [isFetching, listOfCoins])

  const buyFunc = (id) => {
    let index = myAssets.findIndex((el) => el.id === id)
    let updatedData = [...myAssets]
    updatedData[index].quantity += 1
    setMyAssets(updatedData)
  }
  const sellFunc = (id) => {
    let coinQuantity = myAssets.find((asset) => asset.id === id).quantity
    if (coinQuantity > 0) {
      let index = myAssets.findIndex((el) => el.id === id)
      let updatedData = [...myAssets]
      updatedData[index].quantity -= 1
      setMyAssets(updatedData)
    }
  }

  if (isFetching) {
    return (
      <div className='loading'>
        <Spin />
      </div>
    )
  }
  return (
    <div className='cryptoPortfolio'>
      <Button onClick={() => navigate('/')} className='navigateBtn'>
        Back
      </Button>
      <div className='assets'>
        {myAssets.map((asset, index) => (
          <div key={asset.id} className='coin'>
            <p>{index + 1 + '. '}</p>
            <p>{`${asset.name}: ${asset.quantity}`}</p>
            <p>{(asset.price * asset.quantity).toFixed(2) + '$'}</p>
            <div className='btns'>
              <Button onClick={() => buyFunc(asset.id)}>Buy 1</Button>
              <Button onClick={() => sellFunc(asset.id)}>Sell 1</Button>
            </div>
          </div>
        ))}
        <h1>{'Total price ' + total.toFixed(2) + '$'}</h1>
      </div>
      <PieChart myAssets={myAssets} />
    </div>
  )
}
