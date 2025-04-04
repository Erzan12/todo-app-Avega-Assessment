import { useState } from "react";

function TodoItem({ task, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);

    const handleEditClick = () => { 
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        if (newTitle.trim() === '') {
            alert('Task should not be empty! Please input a task.');
            return; // dont proceed if the title is emtpy
        }
        onEdit(newTitle); // dall parent onEdit function
        setIsEditing(false); // exit editing mode
    };

    const handleCancelClick = () => {
        setNewTitle(task.title); // reset to original title if cancelled
        setIsEditing(false);
    };

    return (
        <li
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
            marginBottom: '8px',
          }}
        >
          <input type="checkbox" checked={task.completed} onChange={onToggle} />
          {isEditing ? (
            <>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
              />
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <>
              <span onClick={handleEditClick} style={{ cursor: 'pointer' }}>
                {task.title}
              </span>
              <button onClick={onDelete} style={{ marginLeft: '10px' }}>
                ❌
              </button>
            </>
          )}
        </li>
      );
}

export default TodoItem;