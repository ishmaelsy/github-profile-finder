// ProfileCard: a small card with a person's avatar, name, username and bio.

function ProfileCard({ user, children }) {
  return (
    <article className="profile-card">
      <img
        className="profile-card-avatar"
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
      />

      {/* Some users have no display name, so it fall back to their username. */}
      <h3 className="profile-card-name">{user.name || user.login}</h3>
      <p className="profile-card-login">@{user.login}</p>

      {/* Only show the bio if the user has one. */}
      {user.bio && <p className="profile-card-bio">{user.bio}</p>}

      
      {children && <div className="profile-card-actions">{children}</div>}
    </article>
  )
}

export default ProfileCard
