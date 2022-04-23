let welcomeMsg = document.querySelector('.main__left-display-welcome');
let loginButton = document.querySelector('.main__left-display-login-button');
let loginModal = document.querySelector('.main__central-display-login-modal');
let modalMask = document.querySelector('.main__central-display-modal-mask');
let input = document.querySelector('.input');
let loginSubmitButton = document.querySelector('.login__submit-button')
let loginUsername = document.querySelector('.login__username');
let loginPassword = document.querySelector('.login__password');
let invalidUsernameMsg = document.querySelector('.login__invalid-username');
let invalidPasswordMsg = document.querySelector('.login__invalid-password');
let pastBookingsButton = document.querySelector('.dashboard__past-bookings-button')
let pastTotalSpent = document.querySelector('.dashboard__total-spent')



export { loginButton, input, welcomeMsg, loginModal, modalMask, loginSubmitButton, loginUsername, loginPassword, invalidUsernameMsg, invalidPasswordMsg, pastBookingsButton, pastTotalSpent }