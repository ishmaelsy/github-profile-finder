// Saved page (URL: "/saved")

import { Link } from 'react-router-dom'
import ProfileCard from '../components/profilecard.jsx'
import './saved.css'

function Saved({ saved, onRemove }) {
  return (
    <div className="container page">
      <h1>Saved profiles</h1>

      {/* EMPTY STATE: a condition ? (show this) : (show that) */}
      {saved.length === 0 ? (
        <div className="state-box">
          <h2>No saved profiles yet</h2>
          <p>Open a profile and press "Save profile" to keep it here.</p>
          <Link className="btn btn-primary" to="/">Find a profile</Link>
        </div>
      ) : (
        <div className="saved-grid">
          {saved.map((user) => (
            <ProfileCard key={user.login} user={user}>
              <Link className="btn" to={'/user/' + user.login}>View</Link>
              {/* The arrow function is needed so onRemove runs on CLICK
                  and not while the page is being drawn. */}
              <button className="btn" onClick={() => onRemove(user.login)}>Remove</button>
            </ProfileCard>
          ))}
        </div>
      )}
    </div>
  )
}

export default Saved
