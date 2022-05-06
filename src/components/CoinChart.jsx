import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export default function CoinChart({ chartData, coinId2, coinData }) {
  const coinChartData = {
    labels: chartData.prices
      .map((date) => new Date(date[0]).getDate() + 'd')
      .splice(0, 14),
    datasets: [
      {
        label: `Price ${coinId2}`,
        data: chartData.prices?.map((price) => price[1].toFixed(3)),
        backgroundColor: '#4831D4',
      },
    ],
  }
  return (
    <div className='coinChart'>
      <img src={coinData[0].image} alt={coinData[0].id} />
      {chartData !== undefined && <Bar data={coinChartData} />}
      <p>14 day price change</p>
    </div>
  )
}
