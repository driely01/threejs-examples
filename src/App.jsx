import './App.css'
import ShadowsCtl from './components/ShadowsCtl'
import FirstGeometry from './components/FirstGeometry'
import Menu from './components/Menu'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Earth from './components/Earth'

function App() {
  return (
    <div className='flex'>
			<BrowserRouter>
				<Menu />
				<Routes>
					<Route path='/' element={<ShadowsCtl />} />
					<Route path='/first' element={<FirstGeometry />} />
					<Route path='/earth' element={<Earth />} />
				</Routes>
			</BrowserRouter>
    </div>
  )
}

export default App

