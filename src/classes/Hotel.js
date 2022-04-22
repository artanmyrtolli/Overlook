import Customer from "./Customer";
import Room from "./Room";

class Hotel {
    constructor (bookings, customerData) {
        this.allRooms;
        this.allCustomers = customerData;
        this.bookings = bookings;
        this.todaysEarnings;
    }

    instantiateRooms(roomData) {
        this.allRooms = roomData.map(room => room = new Room(room.number, room.roomType, room.bidet, room.bedSize, room.numBeds, room.costPerNight))
    }

    instantiateCustomer(id){
        return new Customer(id, this.allCustomers.find(e => e.id === id).name) 
    }

    filterBookingsByDate(date){
        return this.bookings.filter(booking => booking.date === date)
    }

    filterRoomsByType(type){
        return this.allRooms.filter(room => room.roomType === type)
    }

    returnFreeRooms(date){
        let bookings = this.filterBookingsByDate(date);
        let remainingRooms = this.allRooms;

        bookings.forEach(booking => {
            remainingRooms.forEach((room, index) => {
                if (booking.roomNumber === room.number){
                    remainingRooms.splice(index, 1)
                }
            })
        })
        return remainingRooms
    }
    
    populateCustomerHistory(customerID){
        let pastBookings = this.bookings.filter(booking => booking.userID === customerID)
        
        pastBookings.forEach(booking => {
        this.allRooms.forEach(room => {
                if (booking.roomNumber === room.number){
                    booking.cost = room.costPerNight
                }
            })
        })
        return pastBookings

    }

}


export default Hotel;