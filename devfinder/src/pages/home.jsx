// Home page (URL: "/").

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../components/searchbar.jsx'
import ProfileCard from '../components/profilecard.jsx'
import './home.css'

const RECENT_KEY = 'devfinder-recent' // where the recent list is stored in localStorage
const MAX_RECENT = 5                  // how many recent searches we keep

// Example profiles. This is plain data, I did NOT call the API for them.
// (https://github.com/USERNAME.png always gives that person's avatar picture.)
const examples = [
  { login: 'octocat', name: 'The Octocat', bio: 'The GitHub mascot', avatar_url: 'https://github.com/octocat.png' },
  { login: 'torvalds', name: 'Linus Torvalds', bio: 'Creator of Linux', avatar_url: 'https://github.com/torvalds.png' },
  { login: 'gaearon', name: 'Dan Abramov', bio: 'Co-creator of Redux', avatar_url: 'https://github.com/gaearon.png' },
]

function Home() {
 
  const navigate = useNavigate()

  // STATE: the list of recent usernames. Starts from localStorage (or empty).
  const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY)) || []
    } catch {
      return []
    }
  })

  function handleSearch(username) {

    const updated = [
      username,
      ...recent.filter((name) => name.toLowerCase() !== username.toLowerCase()),
    ].slice(0, MAX_RECENT)

    setRecent(updated)
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated))

    // Go to the Profile page, for example "/user/octocat".
    navigate('/user/' + username)
  }

  function clearRecent() {
    setRecent([])
    localStorage.removeItem(RECENT_KEY)
  }

  return (
    <div className="container page">
      <section className="home-hero">
        <h1>Find any GitHub developer</h1>
        <p className="home-subtitle">Search a username to see their profile and repositories.</p>

       
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* Only show this section if there is at least one recent search. */}
      {recent.length > 0 && (
        <section className="home-section">
          <div className="home-section-header">
            <h2>Recent searches</h2>
            <button className="home-clear" onClick={clearRecent}>Clear</button>
          </div>
          <div className="home-chips">
            {recent.map((name) => (
              <Link key={name} className="chip" to={'/user/' + name}>{name}</Link>
            ))}
          </div>
        </section>
      )}

      <section className="home-section">
        <h2>Try one of these</h2>
        <div className="home-examples">
          {examples.map((person) => (
            <ProfileCard key={person.login} user={person}>
             
              <Link className="btn" to={'/user/' + person.login}>View profile</Link>
            </ProfileCard>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
