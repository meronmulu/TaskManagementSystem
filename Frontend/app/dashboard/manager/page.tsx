import { ProtectedRoute } from '@/components/ProtectedRoute'
import React from 'react'

function ManagerDashbord() {
  return (
    <ProtectedRoute allowedRoles={['MANAGER']}>
      <div>Manager Page Content</div>
    </ProtectedRoute>
  )
}

export default ManagerDashbord