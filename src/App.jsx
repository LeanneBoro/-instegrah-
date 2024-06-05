import { useState } from 'react'
import { NavBar } from './cmps/NavBar'
import { PostIndex } from './views/PostIndex'


function App() {

  return <section className='flex'>
    <NavBar />
    <PostIndex />
  </section>

}

export default App
