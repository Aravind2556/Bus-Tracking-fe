import React, { useState } from 'react'

const ViewBusDetails = () => {
  const apiurl = process.env.REACT_APP_API_URL;
  const [Buses,setBuses]=useState(null)
  console.log("Fetch buses",Buses)
  React.useEffect(() => {
    if (apiurl) {
      fetch(`${apiurl}/fetch-bus`, {
        method: 'GET',
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => {
          if(data.success === true){
            setBuses(data.Bus)
          }
          else{
            alert(data.message)
          }
          
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }
  }, [apiurl]);


  if(Buses === null){
    return <div>Loading...</div>
  }
  


  return (
    <div>
      
    </div>
  )
}

export default ViewBusDetails
