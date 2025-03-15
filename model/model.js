const mongoose = require("mongoose");

const employeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true,
        unique: true
    },

    address: {
        type: String,
        required: true
    },

    password: {
        type:String,
        required: true
    },

    confirmpassword: {
        type: String,
        required: true
    },

})

const register = new mongoose.model("DataUser", employeSchema);

module.exports = register;