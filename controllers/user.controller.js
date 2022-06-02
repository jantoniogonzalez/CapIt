const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {

    register: (req, res) =>{
        console.log("in register");
        console.log(req.body);

        const user = new User(req.body);

        user.save()
            .then((newUser)=>{
                console.log(newUser);
                res.json({
                    successfulMessage: "Thank you for registering",
                    user: newUser
                })
            })
            .catch((err)=>{
                console.log("register not successful");
                console.log(err);
                res.status(400).json(err);
            })        
    },

    login: (req, res) =>{
        User.findOne({email: req.body.email})
            .then((userRecord)=>{
                if(userRecord === null){
                    res.status(400).json({message: "Email and/or password are invalid"})
                }
                else{
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((isPasswordValid)=>{
                            if(isPasswordValid){
                                console.log("Password is valid");

                                res.cookie(
                                    "usertoken",
                                    jwt.sign(
                                        {
                                            id: userRecord._id,
                                            email: userRecord.email,
                                            username: userRecord.username
                                        },
                                        process.env.JWT_SECRET,
                                    ),
                                    
                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 10000000)
                                    }
                                ).json({
                                    message: "Successfuly logged in",
                                    userLoggedIn: userRecord.username,
                                    userId: userRecord._id
                                })
                            }
                            else{
                                res.status(400).json({
                                    message: "Email and/or password are invalid"
                                })
                            }
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.status(400).json({
                                message: "Email and/or password are invalid"
                            })
                        })
                }
            })
            .catch((err)=>{
                console.log("error");
                res.status(400).json({
                    message: "Invalid Attempt"
                })
            })
    },

    logout: (req, res) => {
        console.log("logging out");
        res.clearCookie("usertoken");
        res.json({
            message: "Thanks for using CapIt!"
        })
    },

    getOneUser: (req, res) =>{
        User.findOne({_id: req.params.id})
            .then((oneUser)=>{
                console.log(oneUser);
                res.json(oneUser);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    }

}