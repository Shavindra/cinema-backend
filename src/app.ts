import express from 'express';
import compression from 'compression';  // compresses requests
import bodyParser from 'body-parser';
import mongoose from './app.database';

// Create Express server
const app = express();

process.on('uncaughtException', function (err) {
    console.error(err, 'The application exit due to an uncaught exception, reson: %s',
        err.message);
    stop();
});

const gracefulExit = () => {
    mongoose.connection.close(function () {
        console.info('Mongoose default connection with database is disconnected through app termination');
        stop();
    });
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit);
process.on('SIGTERM', gracefulExit);

let running: any;
mongoose.connection.on('connected', function () {
    console.info('connected to mongo server and starting server.');
    if (running) {
        return;
    }
    running = true;

});

// Express configuration
app.set('port', 3001);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('*', (req, res)=>{
    res.status(200).json({message: 'API is working'})
});

export default app;