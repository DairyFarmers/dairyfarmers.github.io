import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const EmailVerification = ({ children }) => {
    const isEmailVerified = useSelector((state) => state.user.is_verified);

    if (!isEmailVerified) {
        return <Navigate to="/verify-email" replace />
    }

    return children
}
