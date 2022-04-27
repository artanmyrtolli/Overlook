import chai from 'chai';
import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';
const expect = chai.expect;

import { roomData, bookingData, customerData } from './sample-data';
let hotel;

describe('Hotel', () => {
    beforeEach( () => {
        hotel = new Hotel(bookingData, customerData)
        hotel.instantiateRooms(roomData)
    });

    it('should be an instance of Hotel', () => {
        expect(hotel).to.be.an.instanceOf(Hotel);
    });

    it('should have list of all rooms', () => {
        expect(hotel.allRooms.length).to.equal(6)
        expect(hotel.allRooms[0]).to.deep.equal({
            number: 1,
            roomType: "residential suite",
            bidet: true,
            bedSize: "queen",
            numBeds: 1,
            costPerNight: 358.4
        })
    });

    it('should instantiate a new Customer', () => {
        expect(hotel.instantiateCustomer(6)).to.be.an.instanceOf(Customer);
    });

    it('should recognize who logged in', () => {
        expect(hotel.instantiateCustomer(6).name).to.equal('Fleta Schuppe');
    });

    it('should have a list of all bookings', () => {
        expect(hotel.bookings).to.deep.equal(bookingData);
    });

    it('should be able to filter bookings by date', () => {
        let date = '2022/01/11'
        let date2 = ''
        expect(hotel.filterBookingsByDate(date)).to.deep.equal([{
            id: "5fwrgu4i7k55hl6ta",
            userID: 25,
            date: "2022/01/11",
            roomNumber: 5
        },
        {
            id: "5fwrgu4i7k55hp7tf",
            userID: 36,
            date: "2022/01/11",
            roomNumber: 2
        }]);
        expect(hotel.filterBookingsByDate(date2)).to.deep.equal([])
    });

    it('should return a list of available rooms for a date', () => {
        let date = '2022/01/11'
        expect(hotel.returnFreeRooms(date).length).to.equal(4);
        expect(hotel.returnFreeRooms(date)[0]).to.deep.equal({
            number: 1,
            roomType: 'residential suite',
            bidet: true,
            bedSize: 'queen',
            numBeds: 1,
            costPerNight: 358.4
          });
    });

    it("should return a customer's history, with prices and room types", () => {
        expect(hotel.populateCustomerHistory(9).length).to.equal(3);
        expect(hotel.populateCustomerHistory(9)[0]).to.deep.equal({
            id: '5fwrgu4i7k55hl6sz',
            userID: 9,
            date: '2022/04/22',
            roomNumber: 2,
            cost: 477.38,
            "roomType": "suite"
          });
          expect(hotel.populateCustomerHistory(9)[1].cost).to.equal(340.17)
    });
    
});
  
