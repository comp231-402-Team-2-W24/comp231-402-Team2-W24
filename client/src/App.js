import { Route, Routes } from "react-router-dom";
import { Login, Signup, ReminderList } from "./pages";
import Home from "./pages/Home";
import Notes from "./pages/Notes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reminders" element={<ReminderList />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </div>
  );
}

export default App;
