import React from 'react'
import SlotList from './SlotList'

export default function Master(props) {
  console.log(props);
    
  const {id, firstName, lastName, workrole} = props;
  return (
    <div>
        <h3>{firstName} {lastName},{workrole}</h3>
    </div>
  )
}
