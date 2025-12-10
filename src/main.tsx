import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n'; // import i18n
import { ThemeProvider } from './contexts/ThemeContext.tsx';

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')


createRoot(rootElement).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)