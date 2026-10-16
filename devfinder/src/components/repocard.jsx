// RepoCard: one repository in the list on the Profile page.
const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Go: '#00add8',
  Rust: '#dea584',
  PHP: '#4f5d95',
  Ruby: '#701516',
  Shell: '#89e051',
  Dart: '#00b4ab',
  Kotlin: '#a97bff',
  Swift: '#f05138',
  'Jupyter Notebook': '#da5b0b',
}

function RepoCard({ repo }) {
  // If the language is not in the  table, uses grey.
  const dotColor = languageColors[repo.language] || '#8b949e'

  
  const updated = new Date(repo.updated_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <article className="repo-card">
      <div className="repo-card-top"> 
        {/* target="_blank" opens a new tab. */}
        <a className="repo-card-name" href={repo.html_url} target="_blank" rel="noreferrer">
          {repo.name}
        </a>
        {repo.fork && <span className="repo-card-tag">Fork</span>}
      </div>

      {/* Many repos have no description, so this show a fallback text. */}
      <p className="repo-card-desc">{repo.description || 'No description provided.'}</p>

      <div className="repo-card-meta">
        {/* Some repos have no language (null), so only show it if it exists. */}
        {repo.language && (
          <span>
            <span className="repo-card-dot" style={{ backgroundColor: dotColor }}></span>
            {repo.language}
          </span>
        )}
        <span>Stars {repo.stargazers_count}</span>
        <span>Forks {repo.forks_count}</span>
        <span>Updated {updated}</span>
      </div>
    </article>
  )
}

export default RepoCard
