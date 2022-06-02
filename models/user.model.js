const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({

    username:{
        type: String,
        required:[true, "Username is required!"]
    },

    email:{
        type:String,
        required:[true, "Email is required!"]
    },

    password:{
        type: String,
        required:[true, "password is required!"],
        minLength: [8, "Your password must be at least 8 characters long"]
    }
},{timestamps: true})

    UserSchema.virtual("confirmPassword")
        .get(()=>this._confirmPassword)
        .set((value)=> this._confirmPassword = value)

    UserSchema.pre("validate", function(next){
        console.log("in validate");

        if(this.password !== this.confirmPassword){
            this.invalidate("confirmPassword", "Passwords must match");
            console.log("Passwords didn't match")
        }
        console.log(this.password, this.confirmPassword);

        next();
    })

    UserSchema.pre("save", function(next){
        console.log("pre save");

        bcrypt.hash(this.password, 10)
            .then((hashedPassword)=>{
                console.log("in hash")
                this.password = hashedPassword;
                next();
            })
    })

    const User = mongoose.model("User", UserSchema);

    module.exports = User;