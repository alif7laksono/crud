// App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./components/taskList";
import AddTask from "./components/addTask";
import EditTask from "./components/editTask";

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
          <Route path="/" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
