import { useState } from 'react'
import { SideHeader } from './cmps/SideHeader'
import { PostIndex } from './views/PostIndex'


function App() {

  return <section className='flex'>
    <SideHeader />
    <PostIndex />
  </section>

}

export default App
