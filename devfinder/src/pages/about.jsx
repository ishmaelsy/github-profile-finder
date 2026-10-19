// About page (URL: "/about"): mostly static text. No state, no props.


import './about.css'


const REPO_URL = 'https://github.com/ishmaelsy/github-profile-finder';

function About() {
  return (
    <div className="container page">
      <h1>About DevFinder</h1>
      <p className="about-intro">
        DevFinder lets you look up any developer on GitHub. Type a username to see
        their profile, their stats and their repositories, then save the profiles
        you want to come back to.
      </p>

      <h2>What you can do</h2>
      <div className="about-features">
        <div className="about-card">
          <h3>Search</h3>
          <p>Find any public GitHub account by username.</p>
        </div>
        <div className="about-card">
          <h3>Explore repos</h3>
          <p>Sort by stars or date and filter by language.</p>
        </div>
        <div className="about-card">
          <h3>Save</h3>
          <p>Keep your favourite profiles. They stay saved in your browser.</p>
        </div>
      </div>

      <h2>Built with</h2>
      <div className="about-tags">
        <span className="chip">React</span>
        <span className="chip">React Router</span>
        <span className="chip">Vite</span>
        <span className="chip">GitHub REST API</span>
      </div>

      <p className="about-links">
        <a className="btn" href={REPO_URL} target="_blank" rel="noreferrer">Source code</a>{' '}
        <a className="btn" href="https://docs.github.com/en/rest" target="_blank" rel="noreferrer">GitHub API docs</a>
      </p>
    </div>
  )
}

export default About
