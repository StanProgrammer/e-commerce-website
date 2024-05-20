const mongoose = require('mongoose');


const connect_db =async()=>{
    try {
        
        mongoose.connect(process.env.MONGODB_URI)
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect_db