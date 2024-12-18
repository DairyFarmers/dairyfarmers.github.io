import { Routes, Route } from 'react-router-dom';
import CreateAccount from './pages/Signup/CreateAccount';
import Login from './pages/Signin/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
