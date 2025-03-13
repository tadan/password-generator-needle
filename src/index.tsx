import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

/* Import Neo4j Design Language base style */
import '@neo4j-ndl/base/lib/neo4j-ds-styles.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
