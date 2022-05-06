import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export default function PieChart({ myAssets }) {
  const assetsDataChart = {
    labels: myAssets.map((asset) => asset.name),
    datasets: [
      {
        label: 'usd',
        data: myAssets.map((asset) => asset.price * asset.quantity),
        backgroundColor: '#4831D4',
      },
    ],
  }
  return (
    <div className='pieChart'>
      <Pie data={assetsDataChart} />
    </div>
  )
}
