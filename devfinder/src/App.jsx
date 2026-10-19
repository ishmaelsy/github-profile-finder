// App.jsx is the "root" component of the app.

import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import Home from './pages/home.jsx'
import Profile from './pages/profile.jsx'
import Saved from './pages/saved.jsx'
import About from './pages/about.jsx'

// The name we use to store the saved list in the browser's localStorage.
const SAVED_KEY = 'devfinder-saved'

function App() {
  const [saved, setSaved] = useState(() => {
    try {
      // localStorage can only store text, so we saved the list as JSON text.
      // JSON.parse turns that text back into an array.
      return JSON.parse(localStorage.getItem(SAVED_KEY)) || []
    } catch {
      // If the stored text is broken, just start with an empty list.
      return []
    }
  })

  // EFFECT 
  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved))
  }, [saved])

  //FUNCTIONS THAT PAGES CAN CALL
  function isSaved(login) {
    return saved.some((user) => user.login.toLowerCase() === login.toLowerCase())
  }

  function removeSaved(login) {
    setSaved(saved.filter((user) => user.login.toLowerCase() !== login.toLowerCase()))
  }

  // Save the profile if it is not saved yet, remove it if it is.
  function toggleSave(user) {
    if (isSaved(user.login)) {
      removeSaved(user.login)
    } else {
      // We only keep the few fields we need to show a card later.
      const profile = {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        bio: user.bio,
      }
      // [profile, ...saved] = a new array with the new profile first, then the old ones.
      setSaved([profile, ...saved])
    }
  }

  // WHAT APPEARS ON SCREEN 
  return (
    <div className="app">
      <Navbar savedCount={saved.length} />

      <main className="main">
        {/* <Routes> shows only ONE <Route>: the one whose path matches the URL. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/user/:username"
            element={<Profile isSaved={isSaved} onToggleSave={toggleSave} />}
          />

          <Route path="/saved" element={<Saved saved={saved} onRemove={removeSaved} />} />
          <Route path="/about" element={<About />} />

          {/* path="*" matches any URL that no other route matched. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

// A tiny component that is only used here, so we keep it in the same file.
function NotFound() {
  return (
    <div className="container page">
      <div className="state-box">
        <h1>Page not found</h1>
        <p>That page doesn't exist.</p>
        <Link className="btn btn-primary" to="/">Go to the home page</Link>
      </div>
    </div>
  )
}

export default App
