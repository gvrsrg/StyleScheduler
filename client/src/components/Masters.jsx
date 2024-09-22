import React from 'react'
import Master from './Master'


export default function Masters() {

  const [masterList, setMasterList] = React.useState([])
  const baseURL = process.env.REACT_APP_BASE_URL

  React.useEffect(() => {
    fetch(`${baseURL}/api/masters/`)
    .then((res) => {
//      console.log("res", res);
      return res.json();
    })
    .then((data) => {
//      console.log("data", data);
      setMasterList(data);
    })
    .catch((e) => console.log(e));
 
  }, [])


  return (
    <div>
        <h1>Master List</h1>
        {masterList.map(master => {return (
          <Master
            key={master.id}
            id={master.id}
            firstName={master.firstname}
            lastName={master.lastname}
            workrole={master.workrole}
            phonenumber={master.phonenumber}
            />)}  
            )}

    </div>
  )
}
