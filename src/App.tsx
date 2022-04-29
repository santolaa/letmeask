import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NewRoom } from './pages/NewRoom'
import { Home } from './pages/Home'
import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/rooms/new'} element={<NewRoom />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
