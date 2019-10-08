import {Seat} from '../dao';

export const update = (seat, payload) => {
    return Seat.findOneAndUpdate(seat, payload, {new: true});
};
