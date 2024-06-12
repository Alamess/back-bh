const mongoose = require('mongoose') ;
const Admin = mongoose.model('Admin',{
    nom: {
        type: String,
        required : [true,"Add your nom complet"]
    },
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
