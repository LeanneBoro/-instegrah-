import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { NavBar } from './cmps/NavBar'
import { PostIndex } from './views/PostIndex'
import { HeaderNav } from './cmps/HeaderNav'
import { Profile } from './views/Profile'
import { Popup } from './cmps/Popup'
import { PostDetailsPage } from './views/PostDetailsPage'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <HeaderNav />
        <NavBar />
        <Routes>
          <Route path="/" element={<PostIndex />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
        <Popup />
      </Router>
    </Provider>
  )
}

export default App