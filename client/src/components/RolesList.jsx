import React from 'react'
import Role from './Role'
import './roles.css'

export default function RolesList({roles, handleFilter}) {
  return (
    <div className='roles'>
      <Role key={"all"} role={"all"} handleFilter={(e) => handleFilter(e)}/>
      {roles.map(role => <Role key={role} role={role} handleFilter={(e) => handleFilter(e)}/>)}

    </div>
  )
}
