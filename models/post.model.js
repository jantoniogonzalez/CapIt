const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

    postImage: {
        type: String,
        required: [true, "Your post needs an image"]
    },
    caption: {
        type: String,
        required: [true, "Your post needs a caption!"]
    },
    comments:[{
            text: {
                type:String,
                minlength:[1, "Your commment must have at least one character"],
                maxlength: [140, "Your comment cannot have more than 140 characters"]
            },
            commentedBy:{
                type: mongoose.Schema.Types.ObjectId,

                ref: "User"
            }
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "User"
    },
    showComments: {
        type: Boolean,
        default: false
    }
    }, {timestamps: true})

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;