import mongoose from 'mongoose';

export const databaseClose = async () => {
    mongoose.connection.close();
    mongoose.connection.removeAllListeners();
}

export const databaseConnect = () => {
    const dbOptions = {
        autoReconnect: true,
        connectTimeoutMS: 30000,
        reconnectTries: 600,
        reconnectInterval: 1000,
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    
    if (mongoose.connection.db) { return Promise.resolve() }

    console.log('CONNECT');
    return mongoose.connect('mongodb://localhost:27017/test-cinema', dbOptions).catch(console.error);
}