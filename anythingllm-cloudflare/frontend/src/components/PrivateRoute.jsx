import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from './LoadingSpinner'

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, loading, user } = useAuth()

  if (loading) {
    return <LoadingSpinner text="Checking authentication..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

export default PrivateRoute