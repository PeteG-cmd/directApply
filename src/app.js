import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import 'bulma'
import './styles/style.scss'

import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Footer from './components/Footer'


const App = () => (
  <BrowserRouter>
    <Navbar />
    <Signup />
    <Footer />
  </BrowserRouter>

)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)