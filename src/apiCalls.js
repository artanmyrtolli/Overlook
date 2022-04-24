

const fetchDatasets = (dataset) => {
    return fetch(`http://localhost:3001/api/v1/${dataset}`)
      .then(response => response.json())
      .catch(error => console.log(`Error: ${dataset} fetch failed`))
}

let fetchData = Promise.all([fetchDatasets('customers'), fetchDatasets('rooms'), fetchDatasets('bookings')])

const postDataset = (id, date, roomNumber) => {

    return fetch('http://localhost:3001/api/v1/bookings', {
     method: 'POST',
     body: JSON.stringify({
       "userID": parseInt(id),
       "date": date,
       "roomNumber": parseInt(roomNumber)
     }),
     headers: {
       'Content-Type': 'application/json'
     }
   }).then(response => response.json())
//    .then(response => console.log('post response', response))
 
//    fetchData = Promise.all([fetchDatasets('bookings')])
 }


export { fetchData, postDataset }