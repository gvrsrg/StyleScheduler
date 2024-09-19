import React from 'react'
import MasterCard from './MasterCard'


export default function MasterList() {

  const [masterList, setMasterList] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [filteredList, setFilteredList] = React.useState([])
  const [sort, setSort] = React.useState('')

  React.useEffect(() => {
    fetch(`/api/masters/`)
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
          <MasterCard
            key={master.id}
            id={master.id}
            firstName={master.firstname}
            lastName={master.lastname}
            workrole={master.workrole}
            />)}  
            )}

    </div>
  )
}
