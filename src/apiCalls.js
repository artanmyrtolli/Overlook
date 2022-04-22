

const fetchDatasets = (dataset) => {
    return fetch(`http://localhost:3001/api/v1/${dataset}`)
      .then(response => response.json())
      .catch(error => console.log(`Error: ${dataset} fetch failed`))
}

let fetchData = Promise.all([fetchDatasets('customers'), fetchDatasets('rooms'), fetchDatasets('bookings')])

export { fetchData }