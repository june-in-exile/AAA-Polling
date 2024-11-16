import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Providers from './PrivyProvider.tsx'
import Poll from './Poll.tsx' 
import CreatePrivyWallet from './CreatePrivyWallet.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/createPrivyWallet" element={<CreatePrivyWallet />} />
          <Route path="/poll" element={<Poll />} />
        </Routes>
      </Providers>
    </BrowserRouter>
  </StrictMode>,
)
