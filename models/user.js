const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : String,

    habits : Array
    
    // habits array structure
    // [{
    //     habitName: String,
    //      note: string
    //     habitRecord : [
    //           date : String,
    //           status : Number
    //           ]
    //     }]

});

const User = mongoose.model('User',userSchema);

module.exports = User;
