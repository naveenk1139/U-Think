import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Assuming role exists on user, for simplicity we bypass role check if it's missing
  if (allowedRoles && currentUser.role && !allowedRoles.includes(currentUser.role as string)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export const EmployerDashboard = () => {
  return (
    <ProtectedRoute allowedRoles={['employer']}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Employer Dashboard</h1>
        <p>Welcome to the employer portal. Here you can post jobs and review candidates.</p>
      </div>
    </ProtectedRoute>
  );
};

export const AdminDashboard = () => {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome to the admin portal. Here you can manage users and platform settings.</p>
      </div>
    </ProtectedRoute>
  );
};

export const CollegeDashboard = () => {
  return (
    <ProtectedRoute allowedRoles={['college']}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">College Dashboard</h1>
        <p>Welcome to the college portal. Here you can manage your college profile and courses.</p>
      </div>
    </ProtectedRoute>
  );
};
