import { useState } from 'react'
import { NavBar } from './cmps/NavBar'
import { PostIndex } from './views/PostIndex'
import { HeaderNav } from './cmps/HeaderNav'


function App() {

  return <section>
    <HeaderNav/>
    <NavBar />
    <PostIndex />
  </section>

}

export default App
