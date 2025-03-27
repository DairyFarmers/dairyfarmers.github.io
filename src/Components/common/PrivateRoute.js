import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const role = useSelector((state) => state.user.role);

    if (!isLoggedIn) {
        return <Navigate to="/" replace />
    }

    return children;
}

export { PrivateRoute };