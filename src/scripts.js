import './css/styles.css';
import { fetchData, postDataset, deleteBooking } from './apiCalls';
// import Room from './classes/Room';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
import Manager from './classes/Manager';
import { loginButton, calendarInput, welcomeMsg, loginModal, bookingsModal, modalMask, loginSubmitButton, loginPassword, loginUsername, invalidPasswordMsg, invalidUsernameMsg, pastBookingsButton, pastTotalSpent, rightBox, roomsBoxHeader, roomBox, roomBoxAll,  roomFilterDropdown, managerBox, managerSearchButton, managerSearchCustomer, managerDailyBreakdownBox, managerDashboard, managerCustomerInfo, managerCustomerBookings, managerCustomerBookingsButton } from './querySelectors.js'
import datepicker from 'js-datepicker';

import './images/horse-icon.png';
  
let hotel;
let customer;
let selectedDate
let manager;

window.addEventListener('load', function(){
    selectedDate = formatDate(new Date())
    fetchData.then(data => {
        hotel = new Hotel(data[2].bookings, data[0].customers)
        hotel.instantiateRooms(data[1].rooms)
        console.log('hotel', hotel);
    })
})

const formatDate = (date) => {
    let month;
    let day;
    date.getMonth() < 10 ? month = "0" + (date.getMonth() + 1 ) : month = date.getMonth() + 1
    date.getDate() < 10 ? day = "0" + date.getDate() : day = date.getDate()
    return date.getFullYear()+ '/' + month + '/' + day;
}

const loginCustomer = () => {
    resetLoginBox()
        // hide(loginModal);//temp
        // hide(modalMask);
        // hide(loginButton)
        // let userID = parseInt(loginUsername.value.substr(8,2));
        // customer = hotel.instantiateCustomer(6)
        // customer.populatePastBookings(hotel.populateCustomerHistory(6))
        // customer.calculateTotalSpent()
        // populateDashboard()//temp

    if (!validateUsername()){
        show(invalidUsernameMsg)
        return 
    }
    if(validatePassword()) {
       hide(loginButton)
        hide(loginModal);
        hide(modalMask);
        let userID = parseInt(loginUsername.value.substr(8,2));
        customer = hotel.instantiateCustomer(userID)
        customer.populatePastBookings(hotel.populateCustomerHistory(userID))
        customer.calculateTotalSpent()     
        console.log(customer);   
        populateDashboard()
        show(roomBox)
    } else {
         show(invalidPasswordMsg)
     }
}

const validateUsername = () => {
    let checkNumber = loginUsername.value.match(/\d+/) 
    console.log(checkNumber); 
    if (loginUsername.value.substr(0, 7) === 'manager' && validatePassword()){
        loginManager()
        return
    }
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
    customer.pastBookings.sort((a,b) => a.date.split('/').join('') - b.date.split('/').join(''))
    customer.pastBookings.forEach(booking => {
        bookingsModal.innerHTML += `
        <p class="booking_history"> Date: ${booking.date}, Room: ${booking.roomType} <br>Cost : $${booking.cost}</p> 
        `
    }) 
}

const loginManager = () => {
    hide(loginModal);
    hide(modalMask);
    hide(roomBox);
    resetLoginBox();
    manager = new Manager();
    populateManagerDashboard();
}

const populateManagerDashboard = () => {
    let availableRooms = hotel.returnFreeRooms(selectedDate)
    show(managerBox);
    managerDailyBreakdownBox.innerHTML = `
    <p>Rooms available for ${selectedDate}: ${availableRooms.length} , ${100 - ((availableRooms.length / 25) * 100)} % booked.</p><br>
    <p>Todays earnings: ${hotel.todaysBookedRooms.reduce((sum, room) => sum += room.costPerNight,0)}</p>
    `
}

const managerFindCustomer = () => {
    manager.findCustomer(hotel.allCustomers, managerSearchCustomer.value)
    manager.foundCustomer.populatePastBookings(hotel.populateCustomerHistory(manager.foundCustomer.id))
    manager.foundCustomer.calculateTotalSpent()
    customer = manager.foundCustomer
    hide(welcomeMsg)
    console.log(manager.foundCustomer);
    managerDisplayCustomerDetails()
}

const managerDisplayCustomerDetails = () => {
    managerCustomerBookingsButton.disabled = false;
    managerCustomerInfo.innerHTML = `
    <p>Customer: ${manager.foundCustomer.name}</p>
    <p>ID: ${manager.foundCustomer.id}</p>
    <p>Total Spent: ${manager.foundCustomer.totalSpent}</p>
    <p>Number of total Bookings: ${manager.foundCustomer.pastBookings.length}</p>
    <p> To book a room for this customer, please select a date in the calendar above <p>
    `
}

const managerViewDetailedBookings = () => {
    customer.pastBookings.forEach(booking => {
    managerCustomerBookings.innerHTML += `
    <p>Booking Date: ${booking.date}</p>
    <p>Room: ${booking.roomNumber}</p>
    <p>ID: ${booking.id}</p>
    <p>Cost: $${booking.cost}</p>
    <button id="${booking.id}">Delete Booking</button>
    `
    })
}

const deleteCustomerBooking = (e) => {
    deleteBooking(e.target.id).then(data => {
        console.log(data)
        manager.deleteBooking(e.target.id, hotel)
        managerCustomerBookings.innerHTML = `
        <p> Booking ${e.target.id} has been deleted! </p>
        <p> Please hit the View Detailed Bookings Above to refresh the customer's bookings </p>
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
    roomBox.innerHTML = `<h4 class="main__rooms-header">Available Rooms for ${selectedDate}:</h4>`
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
    roomBox.innerHTML = `<h4 class="main__rooms-header">Sorry, there are no rooms available for your selected date, please choose another date.</h4>`
}

const postBooking = (e) => {
    if (!customer) {
        showLoginModal()
        return
    }
    disableBookingButton(e)
    postDataset(customer.id, selectedDate, e.target.id).then(data => {
        console.log(data);
        hotel.bookings.push(data.newBooking)
        customer.populatePastBookings(hotel.populateCustomerHistory(customer.id))
        customer.calculateTotalSpent()
        populateDashboard()
        populateManagerDashboard()
        managerDisplayCustomerDetails()
    })
}

const disableBookingButton = (e) => {
    let bookButtons = document.querySelectorAll('.room__card-book-button')
    console.log(bookButtons);
    bookButtons.forEach(button => {
        if (button.id === e.target.id){
            button.classList.add('disabled')
            button.innerText = "Booked!"
        }
    })
}

const filterByRoomType = () => {
    renderRoomsAvailable(selectedDate)
    let roomCards = document.querySelectorAll('.main__room-card')
        roomCards.forEach(card => {
            if (card.innerText.toLowerCase() !== roomFilterDropdown.value){
                card.parentElement.remove()
            }
        })
}

const picker = datepicker(calendarInput, {
    alwaysShow: true,
    minDate: new Date(),
    position: "c",
    formatter: (calendarInput, date, instance) => {
        let month;
        let day;
        date.getMonth() < 10 ? month = "0" + (date.getMonth() + 1 ) : month = date.getMonth() + 1
        date.getDate() < 10 ? day = "0" + date.getDate() : day = date.getDate()
        const value = date.getFullYear()+ '/' + month + '/' + day;
        selectedDate = value;
        show(roomBox)
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
roomFilterDropdown.addEventListener('input', filterByRoomType)
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
        hide(bookingsModal)
        hide(loginModal)
        hide(modalMask)
    }
});
managerSearchButton.addEventListener('click', (e) => {
    e.preventDefault();
    managerFindCustomer()
})
managerCustomerBookingsButton.addEventListener('click', (e) => {
    e.preventDefault()
    managerViewDetailedBookings()
})
managerCustomerBookings.addEventListener('click', (e) => {
    e.preventDefault;
    if (!e.target.id) {
        return
    }
    deleteCustomerBooking(e)
})