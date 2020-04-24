const express = require('express');
require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDb = require('./config/db');
const auth = require('./routes/auth');
const sanitize = require('express-mongo-sanitize')
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');

//Initialize express app 
const app = express();

//Configuring the Environment Variables
dotenv.config({path:'./config/config.env'});

//Development mode logging
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}


//Db connection
connectDb();

//Nosql injection
app.use(sanitize());

//precautionary security headers
app.use(helmet());

//CrossSiteScripting
app.use(xss());


 //http parameter pollution attack
 app.use(hpp());


//Json parsing
app.use(express.json());

//Form parsing
app.use(express.urlencoded({extended: false}));

//CORS 
app.use(cors());

//Folder for uploading files or images from the client
app.use('/uploads', express.static('uploads'));

//Serving assets
app.use(express.static(path.join(__dirname, 'static')));

//Routing
app.use('/api/auth', auth);

//Redirect all other urls to client(frontend)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

//Configure the port
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => console.log(`Server running in "${process.env.NODE_ENV}" mode on port "${PORT}"`.yellow.bold));

//Handle the promise rejection error
process.on('unhandledRejection', (err, promise) => {
  console.log('Error: '.red.bold, err.message);
  server.close(() => process.exit(1));
})