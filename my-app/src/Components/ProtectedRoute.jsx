import React, {useEffect} from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }){
    useEffect(() => {
        if(!isAuthenticated){
            alert('Please log in first.');
        }
    }, [isAuthenticated]);

    if(!isAuthenticated){
        return <Navigate to="/" />;
    }

    return children;
}


export default ProtectedRoute;
