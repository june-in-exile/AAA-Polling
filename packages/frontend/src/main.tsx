import "./index.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Providers from './PrivyProviders'
import Poll from './Poll' 
import CreatePrivyWallet from './CreatePrivyWallet'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ReactDOM from "react-dom/client";

import App from "./App";
import Privy from "./Privy";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);


createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <Providers>
          <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/privy" element={<Privy />} />
            <Route path="/createPrivyWallet" element={<CreatePrivyWallet />} />
            <Route path="/poll" element={<Poll />} />
          </Routes>
        </Providers>
      </BrowserRouter>
    </StrictMode>,
  )