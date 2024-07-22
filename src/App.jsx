import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { NavBar } from './cmps/NavBar'
import { PostIndex } from './views/PostIndex'
import { HeaderNav } from './cmps/HeaderNav'

import { Profile } from './views/Profile'


function App() {

  return <section>
    <Router>
      <HeaderNav />
      <NavBar />
      <Routes>
        <Route path="/" element={<PostIndex />} />
        <Route path="/profile/:userId" element={<Profile/>} />
      </Routes>
    </Router>
  </section>

}

export default App
