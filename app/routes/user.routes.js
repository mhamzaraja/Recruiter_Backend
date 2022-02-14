const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const experienceController = require("../controllers/userExperience.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/test/all", controller.allAccess);

  // app.get(
  //   "/api/test/user",
  //   [authJwt.verifyToken],
  //   controller.userBoard
  // );

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );


  // app.get(
  //   "/api/test/user",
  //   [authJwt.verifyToken],
  //   controller.userBoard
  // );

  app.post("/api/user/profile", [authJwt.verifyToken], controller.createUpdate);

  //user Education CRUD
  // app.post("/api/user/education/create", [authJwt.verifyToken], controller.educationCreate );
  // app.get("/api/user/education/get", [authJwt.verifyToken], controller.educationCreate );
  // app.post("/api/user/education/update", [authJwt.verifyToken], controller.educationCreate );
  // app.post("/api/user/education/delete", [authJwt.verifyToken], controller.educationCreate );

  // User Experience
    app.post("/api/user/experience/create", [authJwt.verifyToken], experienceController.createUserExperience );
    app.get("/api/user/experience/getAll/:userId", [authJwt.verifyToken], experienceController.getAllUserExperience );
    app.get("/api/user/experience/get/:userId&:id", [authJwt.verifyToken], experienceController.getUserExperience );
    app.post("/api/user/experience/update/:userId&:id", [authJwt.verifyToken], experienceController.updateUserExperience );
    app.delete("/api/user/experience/delete/:userId&:id", [authJwt.verifyToken], experienceController.deleteUserExperience );

};
