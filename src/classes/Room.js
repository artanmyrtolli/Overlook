
class Room {
    constructor(number, type, bidet, bedSize, numOfBeds, cost) {
        this.number = number; //int
        this.type = type; //string
        this.bidet = bidet; //boolean
        this.bedSize = bedSize; //string
        this.beds = numOfBeds; //int
        this.costPerNight = cost; //int
    }
}




 export default Room;