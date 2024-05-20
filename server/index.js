const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connect_db = require('./config/db');
const router = require('./routes');

const app = express();
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
    credentials:true
}
));
app.use(express.json());
app.use(cookieParser())

app.use("/api",router);
const PORT = 8000 || process.env.PORT

connect_db().then(()=>{
    app.listen(PORT, ()=>{
        console.log('Connected to database')
        console.log('Server running')
    });
})
