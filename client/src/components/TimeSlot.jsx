import React from 'react'
import './slots.css'

export default function TimeSlot({time, masterId, active, handleAppointment}) {



  return (
    <div className={`time-slot${active?"":" taken"}` } masterid={masterId} onClick={(e) => handleAppointment(e)} >{time}</div>
  )
}
