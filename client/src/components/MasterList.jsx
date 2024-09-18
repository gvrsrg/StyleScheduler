import React from 'react'


export default function MasterList() {

  const [masterList, setmasterList] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [filteredList, setFilteredList] = React.useState([])
  const [sort, setSort] = React.useState('')

  React.useEffect(() => {
    fetch(`/api/masters/`)
    .then((res) => {
      console.log("res", res);
      return res.json();
    })
    .then((data) => {
      console.log("data", data);
      setmasterList(data.message);
    })
    .catch((e) => console.log(e));
 
  }, [])



  return (
    <div>
        {masterList.map(master =>
          <MasterCard
            key={master.id}
            id={master.id}
            firstName={master.firstname}
            lastName={master.lastname}
            workrole={master.workrole}
            />  
            )}

    </div>
  )
}
