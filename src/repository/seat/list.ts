import {Seat} from '../dao';


export const list = (payload, pagination, sort) => {
    return Seat.find(payload)
    .sort({
        [sort.sortBy]: sort.sortDir
    })
    .skip(pagination.skip)
    .limit(pagination.limit);
};
