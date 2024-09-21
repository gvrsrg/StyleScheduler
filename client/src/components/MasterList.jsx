import React from 'react'
import MasterCard from './MasterCard'
import RolesList from './RolesList'
//import "dotenv/config.js";
// import { config } from 'dotenv';
// config()


export default function MasterList() {

  const [masterList, setMasterList] = React.useState([])
  const [roles, setRoles] = React.useState([])
  const [filteredList, setFilteredList] = React.useState([])


  //const baseURL = 'http://127.0.0.1:3001'
  const baseURL = process.env.REACT_APP_BASE_URL
  //console.log(baseURL);
  

  React.useEffect(() => {
    fetch(`${baseURL}/api/masters/`)
    .then((res) => {
//      console.log("res", res);
      return res.json();
    })
    .then((data) => {
//      console.log("data", data);
      setMasterList(data);
      setFilteredList(data);
      setRoles(data.reduce((acc, item) => {
        if (!acc.includes(item.workrole)) {
          acc.push(item.workrole);
        }
        return acc;
      }, []));
    
    })
    .catch((e) => console.log(e));
 
  }, [])

  const handleFilter = (e) => {
    setFilteredList(masterList.filter(master => (master.workrole === e.target.innerHTML) || (e.target.innerHTML === "all") ));
  }

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
     .then(data => setFilteredList([...filteredList]))
     .catch(error => console.log(error));
     ;
  }

  return (
    <div>
        <RolesList roles={roles} handleFilter={(e)=>handleFilter(e)} />
        <h1>Master List</h1>
        {filteredList.map(master => {return (
          <MasterCard
            key={master.id}
            id={master.id}
            firstName={master.firstname}
            lastName={master.lastname}
            workrole={master.workrole}
            //handleAppointment={(e)=>handleAppointment(e)}
            />)}  
            )}

    </div>
  )
}
