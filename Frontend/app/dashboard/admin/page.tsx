import { ProtectedRoute } from '@/components/ProtectedRoute'
import React from 'react'

function Adminpage() {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <div>Admin Page Content</div>
    </ProtectedRoute>
)
}

export default Adminpage