import _ from 'lodash';

export const stringToBoolean = (string: String) => {
    return string ? string.toLowerCase().trim() === 'true' : null;
}
