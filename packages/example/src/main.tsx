import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { Web3Provider } from '@tenderize/sdk'
import {
  ThemeProvider
} from '@tenderize/sdk'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Web3Provider>
        <App />
      </ Web3Provider>
    </ ThemeProvider >
  </React.StrictMode >,
)
