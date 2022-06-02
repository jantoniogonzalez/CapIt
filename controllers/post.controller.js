const Post = require("../models/post.model");
const multer = require("multer");
const jwt = require("jsonwebtoken");


module.exports = {

    findAllPosts: (req, res)=>{
        Post.find({})
            .populate("postedBy", "username")
            .then((allPosts)=>{
                console.log(allPosts);
                res.json(allPosts.reverse());
            })
            .catch((err)=>{
                res.json({message: "something went wrong with findAllPosts", error: err})
            })
    },

    findOnePost: (req, res)=>{
        Post.findOne({_id: req.params.id})
            .populate("postedBy", "username")
            .then((onePost)=>{
                console.log(onePost);
                res.json(onePost);
            })
            .catch((err)=>{
                res.json({message: "something went wrong with findOnePost", error:err})
            })
    },

    findAllPostsByUser: (req,res)=>{
        Post.find({ postedBy: req.params.userId })
            .then((allUserPosts)=>{
                console.log(allUserPosts);
                res.json(allUserPosts);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json(err);
            })
    },

    createNewPost: (req, res) =>{
        
        const newPostFile = {
            postImage : req.file.filename,
            caption : req.body.caption
        }

        const newPostObj = new Post(newPostFile);

        const decodedJWT = jwt.decode(req.cookies.usertoken,{
            complete: true
        })

        newPostObj.postedBy = decodedJWT.payload.id;

        newPostObj.save()
            .then((newPost)=>{
                console.log(newPost);
                res.json(newPost);
            })
            .catch((err)=>{
                res.status(400).json(err);
            })
    },

    deletePost: (req, res) =>{
        Post.deleteOne({_id: req.params.id})
        .then((deletedPost)=>{
            console.log(deletedPost);
            res.json(deletedPost);
        })
        .catch((err)=>{
            res.json({message: "something went wrong with deletePost", error:err})
        })
    },
    addComment: (req, res) =>{

        const decodedJWT = jwt.decode(req.cookies.usertoken,{
            complete: true
        })

        const comment = {
            text: req.body.text,
            commentedBy: decodedJWT.payload.id
        }

        Post.findOneAndUpdate(
            {_id: req.params.id},
            {$push: {comments: comment}},
            {new: true, runValidators: true})
            //.populate("comment.commentedBy", "_id username")
            .then((commentAdded)=>{
                console.log(commentAdded);
                res.json(commentAdded);
            })
            .catch((err)=>{
                console.log({error: "Something went wrong with addComment"});
                res.status(400).json(err);
            })
    },

    findAllComments: (req,res) =>{
        Post.findOne({_id: req.params.id})
            .then((onePost)=>{
                console.log(onePost.comments.reverse());
                res.json(onePost.comments.reverse());
            })
            .catch((err)=>{
                res.json({message: "something went wrong with findAllComments", error:err})
            })
    },

    findPostAndShowComments: (req, res) => {
        Post.findOne({_id: req.params.id})
            .then((onePost)=>{
                const update = !onePost.showComments;
                onePost.showComments = update;
                onePost.save()
                    .then((updatedPost)=>{
                        console.log(updatedPost)
                    })
                    .catch((err)=>{
                        res.json({message:"something went wrong with findPostAndShowComments"})
                    })
            })
            .catch((err)=>{
                res.json({message: "something went wrong with findOnePost", error:err})
            })
    }
}