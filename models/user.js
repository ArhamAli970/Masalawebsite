const { default: mongoose } = require("mongoose")

const userSchema =new mongoose.Schema({
    email:{
        type:String,
        req:[true,"give Email"]
    },
    password:{
        type:String,
        req:[true,"give password"]
    },
    number:{
        type:String,
        req:[true,"give Phone number"]
    },

})

const User= mongoose.models.User || mongoose.model("User",userSchema);

export default User;