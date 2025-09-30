// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

// UI5 assets
import '@ui5/webcomponents/dist/Assets.js'
import '@ui5/webcomponents-fiori/dist/Assets.js'
import '@ui5/webcomponents-icons/dist/AllIcons.js'

// ✅ set theme early so initial render uses the right one
import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js'

const SAVED_THEME_KEY = 'ui5-theme'
const savedTheme = localStorage.getItem(SAVED_THEME_KEY)
if (savedTheme) {
  setTheme(savedTheme)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
