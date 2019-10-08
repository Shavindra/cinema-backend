import mongoose from 'mongoose';
import { database } from './config';
import bluebird from 'bluebird';

(<any>mongoose).Promise = bluebird;

const dbOptions = {
    autoReconnect: true,
    connectTimeoutMS: 30000,
    reconnectTries: 600,
    reconnectInterval: 1000,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const dbConfig = database;

const retries = 10;
const retryInterval = 5000;

function connectWithRetry() {

    mongoose.connect(dbConfig.uri, dbOptions).catch((err) => {

        if (retries) {
            console.warn('Failed to connect to mongo on startup - retrying in 5 sec');
            setTimeout(connectWithRetry, retryInterval);
            return;
        }

        console.error(err, 'Failed to connect to mongo on startup after several attempts.');
        throw new Error('Failed to open a initial connection to MongoDB');
    })
}

connectWithRetry();

mongoose.connection.on('error', function (err) {
    console.warn(err, 'MongoDB connection error, %s', err.message);
});

mongoose.connection.on('open', function () {
    console.info('open connection to mongo server.');
});

mongoose.connection.on('connected', function () {
    console.info('connected to mongo server.');
});

mongoose.connection.on('disconnected', function () {
    console.info('disconnected from mongo server.');
});

mongoose.connection.on('close', function () {
    console.info('close connection to mongo server');
});

mongoose.connection.on('reconnect', function () {
    console.info('reconnect to mongo server.');
});

export default mongoose;
