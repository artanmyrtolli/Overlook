import './css/styles.css';
import { fetchData } from './apiCalls';
// import Room from './classes/Room';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
import { loginButton, input, welcomeMsg, loginModal, modalMask, loginSubmitButton, loginPassword, loginUsername, invalidPasswordMsg, invalidUsernameMsg } from './querySelectors.js'
import datepicker from 'js-datepicker';

import './images/horse-icon.png'

let hotel;
let customer;

window.addEventListener('load', function(){
    fetchData.then(data => {
        hotel = new Hotel(data[2].bookings, data[0].customers)
        hotel.instantiateRooms(data[1].rooms)
        console.log('hotel', hotel);
    })
})

const loginCustomer = () => {
    resetLoginBox()
    if (!validateUsername()){
        show(invalidUsernameMsg)
        return 
    }
    if(validatePassword()) {
        hide(loginModal);
        hide(modalMask);
        let userID = parseInt(loginUsername.value.substr(8,2));
        customer = hotel.instantiateCustomer(userID)
        populateDashboard()
    } else {
         show(invalidPasswordMsg)
     }
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
    
}

const showLoginModal = () => {
    hide(welcomeMsg);
    hide(loginButton);
    show(modalMask);
    show(loginModal);
}

const show = (element) => {
    element.classList.remove('hidden');
}

const hide = (element) => {
    element.classList.add('hidden');
}

const picker = datepicker(input, { alwaysShow: true })

loginSubmitButton.addEventListener('click', loginCustomer)
loginButton.addEventListener('click', showLoginModal)