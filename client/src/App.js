import { Route, Routes } from "react-router-dom";
import { Login, Signup, ReminderList } from "./pages";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reminders" element={<ReminderList />} />
      </Routes>
    </div>
  );
}

export default App;
