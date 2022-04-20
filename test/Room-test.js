import chai from 'chai';
import Room from '../src/classes/Room';
const expect = chai.expect;

import { roomData } from './sample-data';
let room;
let room2;
describe('Room', function() {
    beforeEach( () => {
        room = new Room(roomData[0].number, roomData[0].roomType, roomData[0].bidet, roomData[0].bedSize, roomData[0].numBeds, roomData[0].costPerNight)

        room2 = new Room(roomData[1].number, roomData[1].roomType, roomData[1].bidet, roomData[1].bedSize, roomData[1].numBeds, roomData[1].costPerNight)
    });

    it('should instantiate a new Room', () => {
      expect(room).to.be.an.instanceOf(Room);
      expect(room2).to.be.an.instanceOf(Room);
    });

    it('should have a room number', () => {
        expect(room.number).to.equal(1);
        expect(room2.number).to.equal(2);
    });

    it('should have a room type', () => {
        expect(room.type).to.equal('residential suite');
        expect(room2.type).to.equal('suite');
    });

    it('should report if it has a bidet', () => {
        expect(room.bidet).to.equal(true);
        expect(room2.bidet).to.equal(false);
    });

    it('should have a bed size', () => {
        expect(room.bedSize).to.equal('queen');
        expect(room2.bedSize).to.equal('full');
    });

    it('should report number of beds', () => {
        expect(room.beds).to.equal(1);
        expect(room2.beds).to.equal(2);
    });

    it('should cost per night', () => {
        expect(room.costPerNight).to.equal(358.4);
        expect(room2.costPerNight).to.equal(477.38);
    });
});
  