import chai from 'chai';
import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';
const expect = chai.expect;

import { roomData, bookingData, customerData } from './sample-data';
let hotel;
let customer;
let customer2;
let customer3;
describe('Customer', function() {
    beforeEach( () => {
        hotel = new Hotel(bookingData)
        hotel.instantiateRooms(roomData)
        customer = new Customer(customerData[0].id, customerData[0].name);
        customer2 = new Customer(customerData[8].id, customerData[8].name);
        customer3 = new Customer(customerData[7].id, customerData[7].name)
    });

    it('should instantiate a new Customer', () => {
        expect(customer).to.be.an.instanceOf(Customer);
    });

    it('should have an id', () => {
        expect(customer.id).to.equal(1)
        expect(customer2.id).to.equal(9)
    });

    it('should have a name', () => {
        expect(customer.name).to.equal("Leatha Ullrich")
        expect(customer2.name).to.equal("Faustino Quitzon")
    });

    it('should have a list of all past bookings', () => {
        let pastData = hotel.populateCustomerHistory(customer.id)
        customer.populatePastBookings(pastData);

        expect(customer.pastBookings.length).to.equal(1)
        expect(customer.pastBookings).to.deep.equal([{
            id: "5fwrgu4i7k55hl6t8",
            userID: 1,
            date: "2022/02/05",
            roomNumber: 1,
            cost: 358.4
        }])
    });

    it('should have a bigger list of all past bookings', () => {
        let pastData = hotel.populateCustomerHistory(customer2.id)
        customer2.populatePastBookings(pastData);

        expect(customer2.pastBookings.length).to.equal(3)
        expect(customer2.pastBookings).to.deep.equal([
            {
              id: '5fwrgu4i7k55hl6sz',
              userID: 9,
              date: '2022/04/22',
              roomNumber: 2,
              cost: 477.38
            },
            {
              id: '5fwrgu4i7k55hl6t5',
              userID: 9,
              date: '2022/01/24',
              roomNumber: 5,
              cost: 340.17
            },
            {
              id: '5fwrgu4i7k55hl6t6',
              userID: 9,
              date: '2022/01/10',
              roomNumber: 6,
              cost: 397.02
            }
          ])
    });

    it('should have an empty list of all past bookings for a new customer', () => {
        let pastData = hotel.populateCustomerHistory(customer3.id)
        customer3.populatePastBookings(pastData);

        expect(customer3.pastBookings.length).to.equal(0)
        expect(customer3.pastBookings).to.deep.equal([])
    });

    it('should be able to calculate total spent', () => {
        let pastData = hotel.populateCustomerHistory(customer.id)
        customer.populatePastBookings(pastData);
        customer.calculateTotalSpent()
        
        expect(customer.totalSpent).to.equal(358.4)
    });

    it('should be able to calculate total spent for a new customer', () => {
        let pastData = hotel.populateCustomerHistory(customer3.id)
        customer3.populatePastBookings(pastData);
        
        expect(customer3.totalSpent).to.equal(0)
    });

    it('should be able to book a room', () => {
        let pastData = hotel.populateCustomerHistory(customer3.id)
        customer3.populatePastBookings(pastData);
        let newBooking = {
            id: "5fwrgu4i7k55hl6ta",
            userID: 25,
            date: "2022/01/11",
            roomNumber: 5
        }
        let price = 340.17
        
        customer3.bookRoom(newBooking, price)
        
        expect(customer3.pastBookings).to.deep.equal([{
            id: "5fwrgu4i7k55hl6ta",
            userID: 25,
            date: "2022/01/11",
            roomNumber: 5,
            cost: 340.17
        }])
        expect(customer3.totalSpent).to.equal(340.17)
    });

    
   
});
  
