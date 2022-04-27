import Customer from "./Customer";

class Manager {
    constructor(){
        this.foundCustomer;
    }
    findCustomer(allCustomerData, name){
        this.foundCustomer = new Customer(allCustomerData.find(customer => customer.name === name).id, name)
    }
    bookRoom(booking, hotel){
        hotel.bookings.push(booking)
        this.foundCustomer.populatePastBookings(hotel.populateCustomerHistory(this.foundCustomer.id))
    }
    deleteBooking(id, hotel){
        this.foundCustomer.pastBookings.forEach((booking,index) => {
            if(booking.id === id){
                this.foundCustomer.pastBookings.splice(index, 1)
                this.foundCustomer.totalSpent -= booking.cost
            }
        })
        hotel.bookings.forEach((booking, index) => {
            if(booking.id === id){
                hotel.bookings.splice(index, 1)
            }
        })
    }

    
}

export default Manager;