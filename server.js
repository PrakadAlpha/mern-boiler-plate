const express = require('express');
require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDb = require('./config/db');
const auth = require('./routes/auth');

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

//Json parsing
app.use(express.json());

//Form parsing
app.use(express.urlencoded({extended: false}));

//CORS 
app.use(cors());

//Cookies parser
app.use(cookieParser());

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

//Handle the rejections 
process.on('unhandledRejection', (err, promise) => {
  console.log('Error: '.red.bold, err.message);
  server.close(() => process.exit(1));
})