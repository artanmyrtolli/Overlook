import './css/styles.css';
import { fetchData, postDataset } from './apiCalls';
// import Room from './classes/Room';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
import { loginButton, calendarInput, welcomeMsg, loginModal, bookingsModal, modalMask, loginSubmitButton, loginPassword, loginUsername, invalidPasswordMsg, invalidUsernameMsg, pastBookingsButton, pastTotalSpent, rightBox, roomsBoxHeader, roomBox, roomBoxAll,  roomFilterDropdown } from './querySelectors.js'
import datepicker from 'js-datepicker';

import './images/horse-icon.png'
  
let hotel;
let customer;
let selectedDate;

window.addEventListener('load', function(){
    fetchData.then(data => {
        hotel = new Hotel(data[2].bookings, data[0].customers)
        hotel.instantiateRooms(data[1].rooms)
        console.log('hotel', hotel);
    })
})

const loginCustomer = () => {
    resetLoginBox()
        hide(loginModal);//temp
        hide(modalMask);
        hide(loginButton)
        let userID = parseInt(loginUsername.value.substr(8,2));
        customer = hotel.instantiateCustomer(6)
        customer.populatePastBookings(hotel.populateCustomerHistory(6))
        customer.calculateTotalSpent()
        populateDashboard()//temp
    // if (!validateUsername()){
    //     show(invalidUsernameMsg)
    //     return 
    // }
    // if(validatePassword()) {
    //    hide(loginButton)
    //     hide(loginModal);
    //     hide(modalMask);
    //     let userID = parseInt(loginUsername.value.substr(8,2));
    //     customer = hotel.instantiateCustomer(userID)
    //     customer.populatePastBookings(hotel.populateCustomerHistory(userID))
    //     customer.calculateTotalSpent()     
    //     console.log(customer);   
    //     populateDashboard()
    // } else {
    //      show(invalidPasswordMsg)
    //  }
}

const validateUsername = () => {
    let checkNumber = loginUsername.value.match(/\d+/)  
    if (loginUsername.value.substr(0, 8) !== 'customer')
        return false
    if (checkNumber === null)
        return false
    if (loginUsername.value.length > 10 )
        return false
    if (parseInt(checkNumber[0]) > 50)
        return false
    if (parseInt(checkNumber[0]) < 1)
        return false
    return true
}

const resetLoginBox = () => {
    hide(invalidPasswordMsg)
    hide(invalidUsernameMsg)
}

const validatePassword = () => {
    if (loginPassword.value === 'overlook2021')
        return true
    return false
}

const populateDashboard = () => {
    show(pastBookingsButton)
    show(pastTotalSpent)
    welcomeMsg.innerText = `Welcome, ${customer.name}!`
    pastTotalSpent.innerText = `You've spent a total of $${customer.totalSpent} with us!`
}

const showLoginModal = () => {
    show(modalMask);
    show(loginModal);
}

const showBookingsModal = () => {
    show(modalMask)
    show(bookingsModal)
    renderPastBookings()
}

const renderPastBookings = () => {
    console.log(customer.pastBookings);
    customer.pastBookings.forEach(booking => {
        bookingsModal.innerHTML += `
        <p class="booking_history"> Date: ${booking.date}, Room: ${booking.roomType} <br>Cost : $${booking.cost}</p> 
        `
    }) 
}

const show = (element) => {
    element.classList.remove('hidden');
}

const hide = (element) => {
    element.classList.add('hidden');
}

const closeModal = (e) => {
    if (e.target.dataset.bool === 'true'){
        hide(bookingsModal)
        hide(loginModal)
        hide(modalMask)
    }
}

const renderRoomsAvailable = (date) => {
    if (!hotel.returnFreeRooms(date).length){
        renderApologyMessage()
        return
    }
    roomBox.innerHTML = '<h4 class="main__rooms-header">Available Rooms:</h4>'
    let bidet;
    hotel.returnFreeRooms(date).forEach(room => {
        room.bidet ? bidet = "Yes" : bidet = "No"
        let roomTypeCap = room.roomType[0].toUpperCase() + room.roomType.substring(1)
        roomBox.innerHTML += `
        <section class="main__rooms-card-box">
        <div class="main__room-card">
          <h5 class="room__card-header">${roomTypeCap}</h5>
          <img src="" alt=""></div>
        <div class="main__room-card-info">
          <h5 class="room__card-info-header">Room Details:</h5>
          <p class="room__card-info-p">Bed size(s): ${room.bedSize}</p>
          <p class="room__card-info-p">Number of beds: ${room.numBeds}</p>
          <p class="room__card-info-p">Bidet: ${bidet}</p>
          <p class="room__card-info-p">Estimated cost: $${Math.round(room.costPerNight)}</p>
          <button class="room__card-book-button" data-room="${room.roomType}" id=${room.number}>Book Room</button></div>`
    })
}

const renderApologyMessage = () => {
    roomBox.innerHTML = `<h4 class="main__rooms-header">All booked up! We're sorry, there are no rooms available for your selected date, please choose another date.</h4>`
}

const postBooking = (e) => {
    postDataset(customer.id, selectedDate, e.target.id).then(data => {
        console.log(data);
        hotel.bookings.push(data.newBooking)
        customer.populatePastBookings(hotel.populateCustomerHistory(customer.id))
        customer.calculateTotalSpent()
        populateDashboard()
    })
}

const testFunction = () => {
    renderRoomsAvailable(selectedDate)
    let roomCards = document.querySelectorAll('.main__room-card')
    console.log(roomCards);
        roomCards.forEach(card => {
            if (card.innerText.toLowerCase() !== roomFilterDropdown.value){
                card.parentElement.remove()
            }
        })
    console.log(roomFilterDropdown.value);
}

const picker = datepicker(calendarInput, {
    alwaysShow: true,
    formatter: (calendarInput, date, instance) => {
        let month;
        let day;
        date.getMonth() < 10 ? month = "0" + (date.getMonth() + 1 ) : month = date.getMonth() + 1
        date.getDate() < 10 ? day = "0" + date.getDate() : day = date.getDate()
        const value = date.getFullYear()+ '/' + month + '/' + day;
        selectedDate = value;
        renderRoomsAvailable(value)
      }
  })

roomBox.addEventListener('click', (e) => {
    if (!event.target.id) 
    return
    postBooking(e)
})

pastBookingsButton.addEventListener('click', showBookingsModal)
loginSubmitButton.addEventListener('click', loginCustomer)
loginButton.addEventListener('click', showLoginModal)
modalMask.addEventListener('click', (e) => {
    closeModal(e)
});
roomFilterDropdown.addEventListener('input', testFunction)