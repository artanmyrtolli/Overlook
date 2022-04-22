import './css/styles.css';
import { fetchData } from './apiCalls';
// import Room from './classes/Room';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
import { formButton } from './querySelectors.js'

import './images/horse-icon.png'

let hotel;
let customer;

window.addEventListener('load', function(){
    fetchData.then(data => {
        hotel = new Hotel(data[2].bookings)
        hotel.instantiateRooms(data[1].rooms)
        customer = new Customer(data[0].customers[0].id, data[0].customers[0].name )
        console.log('hotel', hotel);
        console.log('customer', customer);
})
})



const testFunction = () => {
    event.preventDefault()
    console.log(customer);
}

// formButton.addEventListener('click', testFunction)