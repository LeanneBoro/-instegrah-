import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { useState } from 'react'
import { NavBar } from './cmps/NavBar'
import { PostIndex } from './views/PostIndex'
import { HeaderNav } from './cmps/HeaderNav'

import { Profile } from './views/Profile'
import { PostEdit } from './views/PostEdit'


function App() {

  return <section>
    <Provider store={store}>
      <Router>
        <HeaderNav />
        <NavBar />
        <Routes>
          <Route path="/" element={<PostIndex />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </Router>
    </Provider>
  </section>

}

export default App
