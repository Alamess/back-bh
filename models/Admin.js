const mongoose = require('mongoose') ;
const Admin = mongoose.model('Admin',{
   
    email: {
        type: String,
        required : [true,"Add your email"]
    },
    
    password:{
        type: String,
        required : [true,"Add your password"]
    },

})
module.exports = Admin ;
