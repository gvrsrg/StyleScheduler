import React from 'react'
import './roles.css'

export default function Role({role, handleFilter}) {
  return (
    <div className='role' onClick={(e) => handleFilter(e)}>{role}</div>
  )
}
