import { ProtectedRoute } from '@/components/ProtectedRoute'
import React from 'react'

function EmployeeDashbord() {
  return (
    <ProtectedRoute allowedRoles={['EMPLOYEE']}>
      <div>Employee Page Content</div>
    </ProtectedRoute>
  )
}

export default EmployeeDashbord