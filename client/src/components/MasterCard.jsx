import React from 'react'
import Master from './Master'
import SlotList from './SlotList'
// import { config } from 'dotenv';
// config()

export default function MasterCard(props) {
  const [masterEvents, setMasterEvents] = React.useState([])
  //const baseURL = 'http://127.0.0.1:3001'
  const baseURL = process.env.REACT_APP_BASE_URL
  //console.log(props.id);
  React.useEffect(() => {
    fetch(`${baseURL}/api/scheduleevents/findByMaster/${props.id}`)
    .then((res) => {
//      console.log("res", res);
      return res.json();
    })
    .then((data) => {
      //console.log("data", data);

      //appointments = data.map(event => event.starttime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }))
      const appointments = data.map(event => event.starttime.substring(11,16))
      //console.log("appointments", appointments);
      setMasterEvents(appointments)
  })
    .catch((e) => console.log(e));
 
  }, [])
//  console.log(masterEvents);
  
  const {id, firstName, lastName, workrole} = props;

  return (
    <div>
      <h2>Master:</h2>
      <Master id={id} firstName={firstName} lastName={lastName} workrole={workrole}  />
      <SlotList 
        master={props} 
        masterEvents={masterEvents} 
        //handleAppointment={(e)=>props.handleAppointment(e)}
      />

    </div>
  )
}
