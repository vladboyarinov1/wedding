import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.scss'
import '@fontsource/bad-script';
import '@fontsource/marck-script';
// Supports weights 400-700
import '@fontsource-variable/lora';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
)
