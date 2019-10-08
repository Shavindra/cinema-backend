import { Request, Response } from 'express';
import _ from 'lodash';

import { seatRepo } from '../../repository';
import { toSeatModel } from '../../models';
import { stringToBoolean, omitUndefinedNull } from '../../helpers';

export const list = (query) => {

    const pagination = {
        limit: query.limit ? parseInt(query.limit, 10) : null,
        skip: query.skip ? parseInt(query.skip, 10) : null
    }

    const sort = {
        sortBy: query.sortBy ? query.sortBy : 'seatNumber',
        sortDir: query.sortDir ? query.sortDir.toLowerCase().trim() === 'asc' ? 1 : -1 : 1
    }

    // TODO: JOI validation / _.pick whitelisted property
    const listPayload: any = omitUndefinedNull({
        disabilityAccessible: stringToBoolean(query.disabled),
        seatNumber: query.seatNumber,
        available: query.available
    });

    return seatRepo.list(listPayload, pagination, sort).then((data) => {
        return data.map((item) => toSeatModel(item));
    });
};

export const listSeats = (req: Request, response: Response) => {
    return list(req.query).then((results) => {
        response.json(results);
    }).catch((err) => {
        response.status(500).json(err);
    });
}

export const cheapestSeat = (req: Request, response: Response) => {
    const query = {
        limit: 1,
        sortBy: 'value',
        sortDir: 'asc'
    }
    return list(query).then((results) => {
        response.json(results[0]);
    }).catch((err) => {
        response.status(500).json(err);
    });
}

export const availableSeats = (req: Request, response: Response) => {

    const disabled = (req.query.disabled && req.query.disabled.toLowerCase() === 'true') ? 'true' : null

    return list({ disabled }).then((results) => {
        const seats = results.map(item => item.seatNumber);
        response.json(seats);
    }).catch((err) => {
        response.status(500).json(err);
    });
}