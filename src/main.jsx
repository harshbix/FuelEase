import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppWithReportPage from './AppWithReportPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithReportPage />
  </StrictMode>,
)
