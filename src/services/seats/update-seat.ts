import { Request, Response } from 'express';
import { seatRepo } from '../../repository';
import { toSeatModel } from '../../models';
import { StatusCodes } from '../../config';

export const bookSeat = (req: Request, res: Response) => {

    const bookSeatUpdatePayload = {
        available: false
    }

    const bookSeatFilter = {
        seatNumber: req.body.seatNumber,
        available: true
    }

    seatRepo
        .update(bookSeatFilter, bookSeatUpdatePayload)
        .then((result) => {
            if (!result) { throw new Error(JSON.stringify(StatusCodes.BAD_REQUEST)) }
            res.json(toSeatModel(result));
        })
        .catch((err) => {
            res.status(403).json(JSON.parse(err.message));
        });
}
