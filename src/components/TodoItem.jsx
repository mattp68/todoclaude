import { useEffect, useRef, useState } from 'react'

export default function TodoItem({ todo, onToggle, onRemove, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const startEditing = () => {
    setDraft(todo.text)
    setEditing(true)
  }

  const commit = () => {
    if (!editing) return
    setEditing(false)
    onUpdate(todo.id, draft)
  }

  const cancel = () => {
    setDraft(todo.text)
    setEditing(false)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      commit()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      cancel()
    }
  }

  return (
    <li className={`todo-item ${todo.done ? 'done' : ''} ${editing ? 'editing' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        {editing ? (
          <input
            ref={inputRef}
            className="edit"
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={onKeyDown}
          />
        ) : (
          <span className="text" onDoubleClick={startEditing}>
            {todo.text}
          </span>
        )}
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
