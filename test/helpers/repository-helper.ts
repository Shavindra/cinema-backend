import { Seat } from '../../src/repository';
import { toSeatModel } from '../../src/models';

export const bulkWriteSeats = (seatData) => {

    const seatList = seatData.map(item => {
        return {
            updateOne: {
                filter: {
                    seatNumber: item.seatNumber
                },
                update: item,
                upsert: true
            }
        }
    });

    return Seat.bulkWrite(seatList)
        .then(() => {
            return Seat.find({}).then((results)=>{
                return results.map((item)=>{return toSeatModel(item)})
            })
        })
        .catch(console.error);
}