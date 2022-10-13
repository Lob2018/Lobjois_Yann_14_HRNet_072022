import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header/index'
import Footer from './components/Footer/index'

import GlobalStyle from './utils/style/GlobalStyle'
import { Provider } from 'react-redux'
import store from './store/store'

import loadable from '@loadable/component'

import Home from './pages/Home/index'
const Employees = loadable(() => import('./pages/Employees/index'))
const Errors = loadable(() => import('./pages/404'))

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="*" element={<Errors />} />
        </Routes>
        <Footer />
      </Provider>
    </Router>
  </React.StrictMode>
)
