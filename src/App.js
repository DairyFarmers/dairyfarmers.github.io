import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { axiosPrivate } from './api/axios';
import { token_verification_path } from './api/config';
import { PrivateRoute } from "./components/common/PrivateRoute";
import { EmailVerification } from "./components/common/EmailVerification";
import SignIn from "./pages/Signin/SignIn";
import Home from "./pages/Home/Home";
import Error from "./pages/Error";
import { login, logout, setAuth } from "./redux/slices/userSlice";
import Password from "./pages/ForgotPassword/Password";
import Verification from "./pages/Verification/Verification";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosPrivate.get(token_verification_path);

        if (response.status === 200) {
          dispatch(login(response.data.data));
          navigate(location.pathname, {
            state: { from: location },
            replace: true,
          });
        }
      } catch (err) {
        dispatch(logout());
      }
    }
    fetchData();
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/error" element={<Error />} />
      <Route path="/" element={
        <PrivateRoute>
          <EmailVerification>
            <Home />
          </EmailVerification>
        </PrivateRoute>
      }/>
      <Route path="/forgotPassword" element={<Password />}/>  
      <Route path="/verifyEmail" element={
        <PrivateRoute>
          <Verification />
        </PrivateRoute>
       }/>
      <Route path="/changePassword/:uid/:token" element={<ChangePassword />}/>
    </Routes>
  );
}

export default App;
