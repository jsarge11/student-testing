let express = require('express')
const aws = require('aws-sdk');
require('dotenv').config();

let app = express();


app.listen(4444, console.log('listening on 4444'))