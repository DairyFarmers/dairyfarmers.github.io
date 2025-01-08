import React from 'react';
import AdminPage from '../pages/Admin/AdminPage';
import BusinessPage from '../pages/Business/BusinessPage';
import CustomerPage from '../pages/Customer/CustomerPage';
import ErrorPage from '../pages/Error/ErrorPage';

const DashboardRouter = ({ userRole }) => {
    if (userRole === 0) {
        return <AdminPage />;
    } else if (userRole === 1) {
        return <BusinessPage />;
    } else if (userRole === 2){
        return <CustomerPage />;
    }
    return <ErrorPage />;
}

export default DashboardRouter
