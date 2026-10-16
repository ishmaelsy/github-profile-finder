// SearchBar: a reusable search form.

import { useState } from 'react'

function SearchBar({ onSearch }) {
  // STATE 1: what the user has typed so far.
  const [text, setText] = useState('')
  // STATE 2: an error message to show under the box ('' means no error).
  const [error, setError] = useState('')

  // Runs every time the user types a letter.
  function handleChange(event) {
   
    setText(event.target.value)
    // Hide the old error as soon as the user starts fixing it.
    if (error) setError('')
  }

  // Runs when the form is submitted (button click OR pressing Enter).
  function handleSubmit(event) {
 
    event.preventDefault()

    const username = text.trim() // remove spaces at the start and end

    if (username === '') {
      setError('Enter a username to search.')
      return
    }

    // GitHub usernames can only contain letters, numbers and hyphens.
    // /^[a-zA-Z0-9-]+$/ is a "regular expression" that checks exactly that.
    if (!/^[a-zA-Z0-9-]+$/.test(username)) {
      setError('Usernames can only have letters, numbers and hyphens.')
      return
    }

    setError('')
    onSearch(username) 
  }

  return (
    <form className="searchbar" onSubmit={handleSubmit} noValidate>
      <div className="searchbar-row">
        {/* This is a "controlled input" */}
        <input
          className="searchbar-input"
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Enter a GitHub username"
          aria-label="GitHub username"
          maxLength={39} // GitHub usernames are at most 39 characters
        />
        <button className="btn btn-primary" type="submit">Search</button>
      </div>

      {/* "&&" means: only show the error paragraph if error is not empty. */}
      {error && <p className="searchbar-error" role="alert">{error}</p>}
    </form>
  )
}

export default SearchBar
