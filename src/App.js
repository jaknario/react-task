import { TaskTable } from "./components/taskTable";
import { TaskCreator } from "./components/TaskCreartor";
import "./App.css";
import { useEffect, useState } from "react";
import { VisibilityControl } from "./components/VisibilityControl";
import { Container } from "./components/Container";

function App() {
  const [tasksItems, setTasksItems] = useState([]); // entrega un arreglo vacío
  const [showCompleted, setShowCompleted] = useState(false);

  function createNewTask(taskName) {
    if (!tasksItems.find((task) => task.name === taskName)) {
      setTasksItems([...tasksItems, { name: taskName, done: false }]);
    }
  }

  const toggleTask = (task) => {
    setTasksItems(
      tasksItems.map((t) =>
        t.name === task.name ? { ...t, done: !t.done } : t
      )
    );
  };

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data) {
      setTasksItems(JSON.parse(data));
    }
  }, []);

  const cleanTask = () => {
    setTasksItems(tasksItems.filter((task) => !task.done));
    setShowCompleted(false);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksItems));
  }, [tasksItems]);

  return (
    <main className="bg-dark vh-100 text-white">
      <Container>
        <TaskCreator createNewTask={createNewTask} />
        <TaskTable tasks={tasksItems} toggleTask={toggleTask} />
        <VisibilityControl
          isChecked={showCompleted}
          setShowCompleted={(checked) => setShowCompleted(checked)}
          cleanTask={cleanTask}
        />
        {showCompleted === true && (
          <TaskTable
            tasks={tasksItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
          />
        )}
      </Container>
    </main>
  );
}

export default App;
