class Customer {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.pastBookings;
        this.totalSpent = 0;
    }
    populatePastBookings(pastData){
        this.pastBookings = pastData;
    }

    calculateTotalSpent(){
        this.totalSpent = Math.round(this.pastBookings.reduce((acc, booking) => acc += booking.cost, 0) * 100) / 100
    }

    bookRoom(newBooking, price){
        newBooking.cost = price;
        this.pastBookings.push(newBooking);
        this.totalSpent += price;
    }
}

export default Customer;