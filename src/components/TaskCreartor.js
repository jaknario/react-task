import { useState } from "react";

export const TaskCreator = ({createNewTask}) => {
  const [newTaskName, setNewTaksName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewTask(newTaskName);
    localStorage.setItem("tasks", newTaskName);
    setNewTaksName(''); // para limpiar el input
  };

  return (
    <form onSubmit={handleSubmit} className="my-2 row">

      <div className="col-9">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTaskName} // para mostrar el estado del input
          onChange={(e) => setNewTaksName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="col-3">
          <button class="btn btn-primary btn-sm">Save Task</button>
      </div>

    </form>
  );
};
