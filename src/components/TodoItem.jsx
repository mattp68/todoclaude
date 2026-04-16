export default function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <li className={`todo-item ${todo.done ? 'done' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span className="text">{todo.text}</span>
      </label>
      <button
        className="remove"
        onClick={() => onRemove(todo.id)}
        aria-label="Remove todo"
      >
        ×
      </button>
    </li>
  )
}
