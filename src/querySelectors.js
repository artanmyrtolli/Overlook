let welcomeMsg = document.querySelector('.main__left-display-welcome');
let loginButton = document.querySelector('.main__left-display-login-button');
let modalMask = document.querySelector('.main__central-display-modal-mask');
let loginModal = document.querySelector('.main__central-display-login-modal');
let bookingsModal = document.querySelector('.main__central-bookings-modal');
let calendarInput = document.querySelector('.datepicker');
let loginSubmitButton = document.querySelector('.login__submit-button');
let loginUsername = document.querySelector('.login__username');
let loginPassword = document.querySelector('.login__password');
let invalidUsernameMsg = document.querySelector('.login__invalid-username');
let invalidPasswordMsg = document.querySelector('.login__invalid-password');
let pastBookingsButton = document.querySelector('.dashboard__past-bookings-button');
let pastTotalSpent = document.querySelector('.dashboard__total-spent');
let rightBox = document.querySelector('.main__right-user-display');
let roomsBoxHeader = document.querySelector('.main__rooms-header');
let roomBox = document.querySelector('.main__rooms-box');
let roomBoxAll = document.querySelectorAll('.main__rooms-box');
// let roomCards = document.querySelectorAll('.main__room-card')
let roomFilterDropdown = document.querySelector('.main__central-rooms-box-dropdown-filter');
let managerBox = document.querySelector('.manager__box');
let managerSearchCustomer = document.querySelector('.manager__input-search-customer');
let managerSearchButton = document.querySelector('.manager__input-search-customer-button');
let managerDailyBreakdownBox = document.querySelector('.manager__daily-breakdown');
let managerDashboard = document.querySelector('.manager__dashboard')
let managerCustomerInfo = document.querySelector('.manager__dashboard-customer-info')
let managerCustomerBookingsButton = document.querySelector('.manager__customer-detailed-bookings-button')
let managerCustomerBookings = document.querySelector('.manager__customer-detailed-bookings')



export { loginButton, calendarInput, welcomeMsg, loginModal, bookingsModal, modalMask, loginSubmitButton, loginUsername, loginPassword, invalidUsernameMsg, invalidPasswordMsg, pastBookingsButton, pastTotalSpent, rightBox, roomsBoxHeader, roomBox, roomBoxAll, roomFilterDropdown, managerBox, managerSearchCustomer, managerSearchButton, managerDailyBreakdownBox, managerDashboard, managerCustomerInfo, managerCustomerBookingsButton, managerCustomerBookings }