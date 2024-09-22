import React from 'react'
import TimeSlot from './TimeSlot';
import './slots.css';

export default function SlotList(props) {
    const baseURL = process.env.REACT_APP_BASE_URL
    const {id, firstName, lastName, workrole} = props.master;
    const startDate = Date.now();
    const startHour = 8;  // 8:00 AM
    const endHour = 20;   // 8:00 PM
    const slotDuration = 30; // 30 minutes
    const slots = [];
    const [masterEvents, setMasterEvents] = React.useState(props.masterEvents);

    //console.log(props.id);
    React.useEffect(() => {
      fetch(`${baseURL}/api/scheduleevents/findByMaster/${props.master.id}`)
      .then((res) => {
  //      console.log("res", res);
        return res.json();
      })
      .then((data) => {
        //console.log("data", data);
  
        //appointments = data.map(event => event.starttime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }))
        const appointments = data.map(event => event.starttime.substring(11,16))
        //console.log("appointments", appointments);
        appointments.sort();
        setMasterEvents(appointments)
    })
      .catch((e) => console.log(e));
   
    }, []);

    const handleAppointment = (e) => {
        e.preventDefault();
        //console.log(e.target.value, e.target.innerHTML);
        const masterId = e.target.getAttribute('masterId')
        //{starttime, endtime, comment, customerId, masterId, serviceId}
        const timeString = e.target.innerHTML;
        const [hours, minutes] = timeString.split(':').map(Number);
        const date = new Date();
        const starttime = new Date();
        const endtime = new Date();
        starttime.setUTCHours(hours);
        starttime.setUTCMinutes(minutes);
        starttime.setUTCSeconds(0);
        starttime.setUTCMilliseconds(0);
     
    
        endtime.setUTCHours(hours);
        endtime.setUTCMinutes(minutes+30);
        endtime.setUTCSeconds(0);
        endtime.setUTCMilliseconds(0);
        const appointment = {
          starttime: starttime,
          endtime: endtime,
          comment: "",
          CustomerId: 1,
          MasterId: masterId,
          ServiceId: 1
        }
    
    
        fetch(`${baseURL}/api/scheduleevents/`,{
             method: 'POST',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             },
             body: JSON.stringify(appointment)
         })
         .then(response => response.json())
         .then(data => {
             setMasterEvents([...masterEvents,timeString].toSorted())
            })
         .catch(error => console.log(error));
         ;
      }


    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += slotDuration) {
            const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            //if (!masterEvents.includes(time)){
                slots.push(time);
            //}
        }
    } 
    //console.log(handleAppointment);
      

  return (
    
    <div className='time-slots'>
        {slots.map(slot => <TimeSlot key={slot} time={slot} masterId={id} active={!masterEvents.includes(slot)} handleAppointment={(e)=>handleAppointment(e)} />)}
    </div>
  )
}
