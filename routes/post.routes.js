const PostController = require("../controllers/post.controller");
const multer = require('multer');
const { authenticate } = require("../config/jwt.config");


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./client/src/imagesPosts/")
    },
    filename: (req, file, callback) => {
        callback(null, Date.now()+file.originalname)
    }
})

const fileCheck = (req, file, callback) =>{
    callback(null, true)
}

const upload = multer({storage : storage, fileCheck : fileCheck})

module.exports = (app) => {
    app.post("/api/cap-it/posts/new", authenticate, upload.single("postImage"), PostController.createNewPost);
    app.put("/api/cap-it/posts/:id", authenticate, PostController.addComment);
    app.get("/api/cap-it/user/posts/:userId", PostController.findAllPostsByUser);
    app.get("/api/cap-it/posts", PostController.findAllPosts);
    app.get("/api/cap-it/posts/comments/:id", PostController.findAllComments);
    app.get("/api/cap-it/post/:id", PostController.findOnePost);
    app.put("/api/cap-it/show-comments/:id", PostController.findPostAndShowComments);
    app.delete("/api/cap-it/posts/delete/:id", authenticate, PostController.deletePost);
}