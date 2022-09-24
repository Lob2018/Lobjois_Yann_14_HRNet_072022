import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/index'
import Header from './components/Header/index'
import Footer from './components/Footer/index'

import GlobalStyle from './utils/style/GlobalStyle'
import { Provider } from 'react-redux'
import store from './store/store'

//import Employees from './pages/Employees/index'
const Employees = lazy(() => import('./pages/Employees/index'))

//import Errors from './pages/404'
const Errors = lazy(() => import('./pages/404'))

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <GlobalStyle />
        <Header />
        <Suspense fallback={<div className="yl-loader"></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="*" element={<Errors />} />
          </Routes>
        </Suspense>
        <Footer />
      </Provider>
    </Router>
  </React.StrictMode>
)
