// App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./components/taskList";
import Navbar from "./components/navbar";
import AddTask from "./components/addTask";

function App() {
  return (
    <Router>
      <div className="">
        <Navbar />
        <Routes>
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
