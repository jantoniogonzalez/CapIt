const UserController = require("../controllers/user.controller");

module.exports = (app) => {
    app.post("/api/cap-it/users/register", UserController.register);
    app.post("/api/cap-it/users/login", UserController.login);
    app.post("/api/cap-it/users/logout", UserController.logout);
    app.get("/api/cap-it/users/:id", UserController.getOneUser);
}