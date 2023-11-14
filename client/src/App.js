import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Home } from "./pages/home";
import { SavedClubs } from "./pages/saved-clubs";

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/auth/login" element={<Login /> } />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/home" element={<Home /> } />
          <Route path="/saved-clubs" element={<SavedClubs /> } />
        </Routes>  
      </Router>
    </div>
  );
}

export default App;