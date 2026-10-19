// main.jsx is the ENTRY POINT of the whole app. It is the first file that runs.


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter switches on React Router. Any component inside it can use
        <Link>, <NavLink>, <Routes>, useParams, useNavigate, etc. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
