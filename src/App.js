import Converter from './pages/Converter'
import CryptocurrencyPortfolio from './pages/CryptocurrencyPortfolio'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Converter />} />
          <Route path='/assets' element={<CryptocurrencyPortfolio />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
