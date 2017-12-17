import mongoose from 'mongoose';

let dbURI = 'mongodb://localhost:27017/eshop';
// Define the Mongoose configuration method
//const db = () => {
//  const db = mongoose.connect('mongodb://maxmos:maxmos2017@ds143151.mlab.com:43151/maxmos');
//const db = mongoose.connect('mongodb://localhost:3001/maxmos');
mongoose.Promise = require('bluebird');

mongoose.connect(dbURI);
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});
/*  console.log('Connected to mongodb');
 mongoose.connection.on('error', function () {
 console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
 });*/
// Return the Mongoose connection instance
/* return db;
 };
 export { db };*/
