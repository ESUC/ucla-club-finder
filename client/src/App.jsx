import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Login } from './pages/login';
import { Register } from './pages/register';
import { Home } from './pages/home';
import { About } from './pages/about';
import { SavedClubs } from './pages/saved-clubs';
import { ForgotPassword } from './pages/forgotPassword';
import { ResetPassword } from './pages/resetPassword';
import { VerifyCode } from './pages/verifyCode';
import { VerifyPassword } from './pages/verifyPassword';
<<<<<<< HEAD
import { Profile } from './pages/profile';

import ProtectedRoutes from "./components/ProtectedRoutes";

=======
import EditProfile from './pages/edit-profile';
>>>>>>> origin/main

export const App = () => {
  return (
    <div className="App">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/verify-code" element={<VerifyCode />} />
          <Route path="/auth/verify-password" element={<VerifyPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
<<<<<<< HEAD

          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/saved-clubs" element={<SavedClubs />} />
          </Route>

=======
          <Route path="/saved-clubs" element={<SavedClubs />} />
          <Route path="/edit-profile" element={<EditProfile />} />
>>>>>>> origin/main
        </Routes>
      </Router>
    </div>
  );
};

export default App;
