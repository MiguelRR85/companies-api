const mongoose = require('mongoose');
const DB_NAME = "companiesApp";
const MONGO_URI = process.env.MONGODB_URI || `mongodb://localhost/${DB_NAME}`;

mongoose.connect(MONGO_URI)
  .then(() => console.info(`Successfully connected to ${MONGO_URI}`))
  .catch(error => console.error('An error ocurred trying to connect to database', error));

 