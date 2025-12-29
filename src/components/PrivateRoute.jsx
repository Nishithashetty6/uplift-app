import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute() {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>Loading...</div>;

    if (!user) {
        return <Navigate to="/login" />;
    }

    // Force onboarding if not complete and trying to access other pages
    if (!user.isOnboarded && location.pathname !== '/onboarding') {
        return <Navigate to="/onboarding" />;
    }

    return <Outlet />;
}
