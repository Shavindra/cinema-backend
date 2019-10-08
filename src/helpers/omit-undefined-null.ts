import _ from 'lodash';

export const omitUndefinedNull = (payload) => {
    return _(payload).omitBy(_.isUndefined).omitBy(_.isNull).value();
}