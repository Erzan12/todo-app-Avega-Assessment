import { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (task.trim() === '') return alert('Please input a task first!');
    setTasks([...tasks, { id: Date.now(), title: task, completed: false }]);
    setTask('');
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (id, newTitle) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, title: newTitle } : t
      )
    );
  };

  return (
    <div className="container">
      <h1>📝 My To-Do List</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={task}
          placeholder="Enter task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <TodoItem
            key={t.id}
            task={t}
            onToggle={() => toggleComplete(t.id)}
            onDelete={() => deleteTask(t.id)}
            onEdit={(newTitle) => editTask(t.id, newTitle)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
