let welcomeMsg = document.querySelector('.main__left-display-welcome');
let loginButton = document.querySelector('.main__left-display-login-button');
let modalMask = document.querySelector('.main__central-display-modal-mask');
let loginModal = document.querySelector('.main__central-display-login-modal');
let bookingsModal = document.querySelector('.main__central-bookings-modal')
let calendarInput = document.querySelector('.datepicker');
let loginSubmitButton = document.querySelector('.login__submit-button')
let loginUsername = document.querySelector('.login__username');
let loginPassword = document.querySelector('.login__password');
let invalidUsernameMsg = document.querySelector('.login__invalid-username');
let invalidPasswordMsg = document.querySelector('.login__invalid-password');
let pastBookingsButton = document.querySelector('.dashboard__past-bookings-button')
let pastTotalSpent = document.querySelector('.dashboard__total-spent')
let rightBox = document.querySelector('.main__right-user-display')



export { loginButton, calendarInput, welcomeMsg, loginModal, bookingsModal, modalMask, loginSubmitButton, loginUsername, loginPassword, invalidUsernameMsg, invalidPasswordMsg, pastBookingsButton, pastTotalSpent, rightBox }