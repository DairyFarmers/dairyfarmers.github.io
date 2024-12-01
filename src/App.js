import { Routes, Route } from "react-router-dom";
import Login from "./pages/Signin/Login";
import AdminLogin from "./pages/AdminSignin/AdminLogin";
import CreateAccount from "./pages/Signup/CreateAccount";
import { useState } from "react";
import Home from "./pages/Home/Home";

function App() {
  const [user, setUp] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/" element={<Login onLogin={() => setLoggedIn(true)} setUp={setUp} />} />
      <Route path="admin" element={<AdminLogin />} />
      <Route path="home" element={<Home/>} />
    </Routes>
  );
}

export default App;
