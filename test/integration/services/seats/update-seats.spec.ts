import request from 'supertest';
import { expect } from 'chai';

import app from '../../../../src/app';
import { seatData } from '../../../blueprints';
import { bulkWriteSeats, databaseClose, databaseConnect } from '../../../helpers';

describe('Service: Seats', () => {

    before(() => {
        return databaseConnect();
    });

    let seatList: any = [];

    beforeEach(async () => {
        const seats = await bulkWriteSeats(seatData);
        seatList = seats;
    });

    describe('Seats: /bookSeat', () => {
        it('should be able to book a seat', async () => {
            const response = await request(app)
                .post('/bookSeat')
                .send({ seatNumber: seatList[0].seatNumber })
                .set('Accept', 'application/json')
                .expect(200);

            expect(response.body).to.eql({
                ...seatList[0],
                available: false,
            });
        });

        it('should be able to book already booked seat', async () => {
            const response = await request(app)
                .post('/bookSeat')
                .send({ seatNumber: seatList[1].seatNumber })
                .set('Accept', 'application/json')
                .expect(403);

            expect(response.body).to.eql({
                code: 403,
                developerMessage: 'Seat already booked or something went wrong',
                userMessage: "Something went wrong",
            });
        });
    });

    after(() => {
        return databaseClose();
    })
});

