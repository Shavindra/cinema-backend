export const toSeatModel = (dao) => {
    if (!dao) {
        return null;
    }

    const seat = dao.toObject();
    delete seat.__v;
    return { // NB: Not exposing the "value" prop to public. Only expose properties they need
        id: seat._id.toString(),
        seatNumber: seat.seatNumber,
        price: seat.price,
        available: seat.available,
        disabilityAccessible: seat.disabilityAccessible
    }
}
