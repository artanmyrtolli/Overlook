import Room from '../src/classes/Room';
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import { userDate, formButton } from './querySelectors.js'

let a = {
    number: 3,
    roomType: "single room",
    bidet: false,
    bedSize: "king",
    numBeds: 1,
    costPerNight: 491.14
}

window.addEventListener('load', function(){
let test = new Room(a.number, a.roomType, a.bidet, a.bedSize, a.numBeds, a.costPerNight)
console.log(test)

})



const testFunction = () => {
    event.preventDefault()
    console.log(userDate.value);
}
    
formButton.addEventListener('click', testFunction)