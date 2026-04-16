import { useMemo, useState } from 'react'
import { useLocalStorage } from './useLocalStorage.js'
import TodoList from './components/TodoList.jsx'
import FilterBar from './components/FilterBar.jsx'

export default function App() {
  const [todos, setTodos] = useLocalStorage('todoclaude.todos', [])
  const [filter, setFilter] = useState('all')
  const [draft, setDraft] = useState('')

  const addTodo = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), text, done: false, createdAt: Date.now() },
    ])
    setDraft('')
  }

  const toggleTodo = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const removeTodo = (id) => setTodos(todos.filter((t) => t.id !== id))

  const updateTodo = (id, text) => {
    const next = text.trim()
    if (!next) {
      removeTodo(id)
      return
    }
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: next } : t)))
  }

  const clearCompleted = () => setTodos(todos.filter((t) => !t.done))

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done)
    if (filter === 'completed') return todos.filter((t) => t.done)
    return todos
  }, [todos, filter])

  const remaining = todos.filter((t) => !t.done).length

  return (
    <main className="app">
      <h1>todoclaude</h1>
      <form className="new-todo" onSubmit={addTodo}>
        <input
          type="text"
          value={draft}
          placeholder="What needs doing?"
          onChange={(e) => setDraft(e.target.value)}
          autoFocus
        />
        <button type="submit" disabled={!draft.trim()}>
          Add
        </button>
      </form>

      <FilterBar
        filter={filter}
        onChange={setFilter}
        remaining={remaining}
        hasCompleted={todos.some((t) => t.done)}
        onClearCompleted={clearCompleted}
      />

      <TodoList
        todos={visible}
        onToggle={toggleTodo}
        onRemove={removeTodo}
        onUpdate={updateTodo}
      />

      {todos.length === 0 && (
        <p className="empty">No todos yet — add one above.</p>
      )}
    </main>
  )
}
