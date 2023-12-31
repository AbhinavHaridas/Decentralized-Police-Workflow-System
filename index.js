// Import Modules
var express = require("express");
let app = express();
require("dotenv").config();
const cors = require("cors");

// Adding middleware
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const userRoute = require('./routes/users');
const officerRoute = require('./routes/officers');
const firRoute = require('./routes/firs');
const evidenceRoute = require('./routes/evidences');
const requestsRoute = require('./routes/requests');

// Specify Major Routes
app.use('/user', userRoute);
app.use('/officer', officerRoute);
app.use('/fir', firRoute);
app.use('/evidence', evidenceRoute);
app.use('/requests', requestsRoute);

app.listen(8000, () => {
    console.log('Listening to requests on port 8000');
});
