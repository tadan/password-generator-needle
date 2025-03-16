import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

/* Import Neo4j Design Language base style */
import '@neo4j-ndl/base/lib/neo4j-ds-styles.css'

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
