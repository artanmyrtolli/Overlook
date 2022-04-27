import chai from 'chai';
import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';
import Manager from '../src/classes/Manager';
const expect = chai.expect;

import { roomData, bookingData, customerData } from './sample-data';
let hotel;
let customer;
let manager;

describe('Manager', () => {
    beforeEach( () => {
        hotel = new Hotel(bookingData, customerData)
        manager = new Manager()
        manager.findCustomer(customerData, 'Leatha Ullrich')
        manager.foundCustomer.populatePastBookings(hotel.populateCustomerHistory(2))
        hotel.instantiateRooms(roomData)
    });

    it('should be an instance of Manager', () => {
        expect(manager).to.be.an.instanceOf(Manager);
    });

    it('find a customer by name', () => {
        expect(manager.foundCustomer.id).to.equal(1)
        expect(manager.foundCustomer.name).to.equal('Leatha Ullrich')
    });

    it('should instantiate a new Customer', () => {
        expect(manager.foundCustomer).to.be.an.instanceOf(Customer);
    });

    it('should be able to book a room for the customer', () => {
        let newBooking = {
            id: "5fwrgu4i7k5fffffff",
            userID: 1,
            date: "2022/07/04",
            roomNumber: 2
        }
        manager.bookRoom(newBooking, hotel)
        expect(manager.foundCustomer.pastBookings.length).to.equal(2);
        expect(manager.foundCustomer.pastBookings.pop()).to.deep.equal(newBooking);
    });
    

    it('should be able to add the booking to the hotel', () => {
        let newBooking = {
            id: "5fwrgu4i7k5fffffff",
            userID: 1,
            date: "2022/07/04",
            roomNumber: 2
        }
        manager.bookRoom(newBooking, hotel)
        expect(hotel.bookings.length).to.equal(15);
        expect(hotel.bookings.pop()).to.deep.equal(newBooking);
    });

    it('should be able to delete a booking from the hotel', () => {
        let booking = {
            id: "5fwrgu4i7k55hp7tf",
            userID: 36,
            date: "2022/01/11",
            roomNumber: 2
        }
        manager.deleteBooking(booking.id, hotel)
        expect(hotel.bookings.length).to.equal(13);
    });

    it('should be able to delete a booking from a customer', () => {
        let booking = {
            id: "5fwrgu4i7k55hp7tf",
            userID: 36,
            date: "2022/01/11",
            roomNumber: 2
        }
        manager.deleteBooking(booking.id, hotel)
        expect(manager.foundCustomer.pastBookings.length).to.equal(0);
    });
    


});
  
