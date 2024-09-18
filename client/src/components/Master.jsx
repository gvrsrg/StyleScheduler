import React from 'react'
import SlotList from './SlotList'

export default function Master({id, firstName, lastName, workrole}) {
  const master = {id, firstName, lastName, workrole}
  return (
    <div>
        <h1>{`$firstName $lastName`}</h1>
        <h2>{workrole}</h2>
    </div>
  )
}
