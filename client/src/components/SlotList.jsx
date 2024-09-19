import React from 'react'
import TimeSlot from './TimeSlot';
import './slots.css';

export default function SlotList(master) {
    const {id, firstName, lastName, workrole} = master.master;
    const startDate = Date.now();
    const startHour = 8;  // 8:00 AM
    const endHour = 20;   // 8:00 PM
    const slotDuration = 30; // 30 minutes
    const slots = [];

    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += slotDuration) {
            const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            slots.push(time);
        }
    } 
    console.log(slots);
      

  return (
    
    <div className='time-slots'>
        {slots.map(slot => <TimeSlot key={slot} time={slot} />)}
    </div>
  )
}
