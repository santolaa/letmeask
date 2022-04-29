import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'

import './styles/global.scss'
import './services/firebase'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
