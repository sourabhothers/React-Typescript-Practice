import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import TodoProvider from './Store/Contexts/TodoProvider'
import { Provider } from 'react-redux'
import TodoStore from './Store/Redux/TodoStore'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={TodoStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
