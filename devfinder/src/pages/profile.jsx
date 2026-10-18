// Profile page (URL: "/user/:username"), the biggest page in the app.

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import StatTile from '../components/stattile.jsx'
import RepoCard from '../components/repocard.jsx'
import './profile.css'

const REPOS_PER_PAGE = 6 // change this number to show more or fewer repos per page


const errorMessages = {
  'not-found': {
    title: 'User not found',
    text: "GitHub doesn't have a user with that name. Check the spelling and try again.",
  },
  'rate-limit': {
    title: 'GitHub rate limit reached',
    text: 'GitHub only allows 60 requests per hour without logging in. Wait a few minutes and try again.',
  },
  network: {
    title: "Couldn't reach GitHub",
    text: 'Check your internet connection and try again.',
  },
}

// Props come from App.jsx: isSaved(login) and onToggleSave(user).
function Profile({ isSaved, onToggleSave }) {
  
  const { username } = useParams()

  // STATE
  // Data from the API
  const [user, setUser] = useState(null)      // the user's profile (null until loaded)
  const [repos, setRepos] = useState([])      // the list of repos
  // What state the request is in
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')      // '' = no error, otherwise an error code
  const [attempt, setAttempt] = useState(0)   // goes up by 1 on "Try again" (see below)
  // What the user chose for the repo list
  const [sortBy, setSortBy] = useState('stars')
  const [language, setLanguage] = useState('All')
  const [page, setPage] = useState(1)

  // FETCH THE DATA 
  useEffect(() => {
    // If the user leaves the page (or changes username) before the answer arrives,
    // the cleanup function at the bottom sets "ignore" to true so that old answer
    // is thrown away and cannot overwrite newer data.
    let ignore = false

    async function loadProfile() {
      setLoading(true)
      setError('')

      try {
        // Promise.all starts both requests at the same time and waits for both.
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
        ])

        // fetch does NOT throw an error for 404 or 403, so thischeck the status ourselves.
        
        if (userResponse.status === 404) throw new Error('not-found')
        if (
          userResponse.status === 403 || userResponse.status === 429 ||
          reposResponse.status === 403 || reposResponse.status === 429
        ) {
          throw new Error('rate-limit')
        }
        if (!userResponse.ok || !reposResponse.ok) throw new Error('network')

        
        const userData = await userResponse.json()
        const reposData = await reposResponse.json()

        if (ignore) return // an old request, throw the answer away

        setUser(userData)
        setRepos(reposData)
        setSortBy('stars')
        setLanguage('All')
        setPage(1)
      } catch (err) {
        if (ignore) return
        const known = ['not-found', 'rate-limit', 'network']
        setError(known.includes(err.message) ? err.message : 'network')
      }

      // This line runs whether the request worked or failed.
      if (!ignore) setLoading(false)
    }

    loadProfile()

    // The cleanup function
    return () => {
      ignore = true
    }
  }, [username, attempt])

  // LOADING 
  // A function can return early. If still loading, show the spinner and stop.
  if (loading) {
    return (
      <div className="container page">
        <div className="state-box" role="status">
          <div className="spinner"></div>
          <p>Loading {username}…</p>
        </div>
      </div>
    )
  }

  // ERROR
  if (error) {
    const message = errorMessages[error]
    return (
      <div className="container page">
        <div className="state-box state-box-error" role="alert">
          <h2>{message.title}</h2>
          <p>{message.text}</p>
          {/* "Try again" makes no sense if the user simply does not exist. */}
          {error !== 'not-found' && (
            <button className="btn btn-primary" onClick={() => setAttempt(attempt + 1)}>
              Try again
            </button>
          )}{' '}
          <Link className="btn" to="/">Back to search</Link>
        </div>
      </div>
    )
  }

  //  SORT, FILTER AND PAGE THE REPOS 

  // All the languages used by this user's repos, without duplicates.
  // "new Set" removes duplicates, "filter(Boolean)" removes empty (null) languages.
  const languages = ['All', ...new Set(repos.map((repo) => repo.language).filter(Boolean))]

  // Step 1: filter by language.
  const filtered = repos.filter((repo) => language === 'All' || repo.language === language)

  // Step 2: sort. [...filtered] makes a copy first because .sort() changes the array it is called on.
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count
    if (sortBy === 'updated') return new Date(b.updated_at) - new Date(a.updated_at)
    return a.name.localeCompare(b.name) // sortBy === 'name'
  })

  // Step 3: cut out just the repos for the current page.
  const totalPages = Math.max(1, Math.ceil(sorted.length / REPOS_PER_PAGE))
  const start = (page - 1) * REPOS_PER_PAGE
  const visibleRepos = sorted.slice(start, start + REPOS_PER_PAGE)

  // When the user changes the sort or language, go back to page 1.
  function handleSortChange(event) {
    setSortBy(event.target.value)
    setPage(1)
  }
  function handleLanguageChange(event) {
    setLanguage(event.target.value)
    setPage(1)
  }

  // Other bits for the header
  const saved = isSaved(user.login)
  const joined = new Date(user.created_at).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  })
  // Some people write their website without "https://", which would break the link.
  const blogUrl = user.blog
    ? (user.blog.startsWith('http') ? user.blog : 'https://' + user.blog)
    : ''

  //THE PROFILE 
  return (
    <div className="container page">
      <Link className="profile-back" to="/">← Back to search</Link>

      <section className="profile-header">
        <img className="profile-avatar" src={user.avatar_url} alt={`${user.login}'s avatar`} />

        <div className="profile-info">
          <h1 className="profile-name">{user.name || user.login}</h1>
          <p className="profile-login">@{user.login}</p>
          {user.bio && <p className="profile-bio">{user.bio}</p>}

          <ul className="profile-meta">
            {user.location && <li>Location: {user.location}</li>}
            {user.company && <li>Company: {user.company}</li>}
            {blogUrl && (
              <li>
                <a href={blogUrl} target="_blank" rel="noreferrer">{user.blog}</a>
              </li>
            )}
          </ul>

          <div className="profile-actions">
            {/* Calls the function from App.jsx. It saves the user or removes them. */}
            <button className="btn btn-primary" onClick={() => onToggleSave(user)}>
              {saved ? 'Remove from saved' : 'Save profile'}
            </button>
            <a className="btn" href={user.html_url} target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      
      <section className="profile-stats">
        <StatTile label="Repos" value={user.public_repos} />
        <StatTile label="Followers" value={user.followers} />
        <StatTile label="Following" value={user.following} />
        <StatTile label="Joined" value={joined} />
      </section>

      <section>
        <div className="profile-repos-header">
          <h2>Repositories ({sorted.length})</h2>

          <div className="profile-filters">
            {/* Controlled <select>s: their value comes from state. */}
            <select
              className="profile-select"
              value={language}
              onChange={handleLanguageChange}
              aria-label="Filter by language"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang === 'All' ? 'All languages' : lang}
                </option>
              ))}
            </select>

            <select
              className="profile-select"
              value={sortBy}
              onChange={handleSortChange}
              aria-label="Sort repositories"
            >
              <option value="stars">Sort: Most stars</option>
              <option value="updated">Sort: Recently updated</option>
              <option value="name">Sort: Name (A to Z)</option>
            </select>
          </div>
        </div>

        {/* EMPTY STATE: this user has no public repos at all. */}
        {repos.length === 0 ? (
          <div className="state-box">
            <p>{user.login} has no public repositories yet.</p>
          </div>
        ) : (
          <>
            <div className="profile-repo-grid">
              {visibleRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>

            {/* Only show the page buttons when there is more than one page. */}
            {totalPages > 1 && (
              <div className="profile-pagination">
                <button
                  className="btn"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                  className="btn"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}

export default Profile
