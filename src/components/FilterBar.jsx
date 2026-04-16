const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
]

export default function FilterBar({
  filter,
  onChange,
  remaining,
  hasCompleted,
  onClearCompleted,
}) {
  return (
    <div className="filter-bar">
      <span className="count">
        {remaining} {remaining === 1 ? 'item' : 'items'} left
      </span>
      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={filter === f.key ? 'active' : ''}
            onClick={() => onChange(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <button
        className="clear"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </div>
  )
}
