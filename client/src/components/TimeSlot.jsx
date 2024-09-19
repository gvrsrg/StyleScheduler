import React from 'react'
import './slots.css'

export default function TimeSlot({time, masterId, handleAppointment}) {
  return (
    <div className='time-slot' masterId={masterId} onClick={(e) => handleAppointment(e)} >{time}</div>
  )
}
