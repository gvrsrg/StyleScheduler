import React from 'react'
import SlotList from './SlotList'

export default function Master(master) {
    
  const {id, firstName, lastName, workrole} = master.master;
  return (
    <div>
        <h3>{firstName} {lastName},{workrole}</h3>
    </div>
  )
}
