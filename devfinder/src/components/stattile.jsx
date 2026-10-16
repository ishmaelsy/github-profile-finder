

function StatTile({ label, value }) {

  const display =
    typeof value === 'number'
      ? new Intl.NumberFormat('en', { notation: 'compact' }).format(value)
      : value

  return (
    <div className="stat-tile">
      <span className="stat-tile-value">{display}</span>
      <span className="stat-tile-label">{label}</span>
    </div>
  )
}

export default StatTile
