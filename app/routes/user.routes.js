const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const eduController = require("../controllers/user.education.controller");

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
  
  //Education
  app.post("/api/user/education/create", [authJwt.verifyToken], eduController.saveEducation);
  app.get("/api/user/education/getAll", [authJwt.verifyToken], eduController.showEducation );
  app.get("/api/user/education/getOne/:id", eduController.showEducationById);
  app.delete("/api/user/education/delete/:id", [authJwt.verifyToken], eduController.deleteEducation );
  app.put("/api/user/education/update/:id", [authJwt.verifyToken], eduController.updateEducation );

  //projects
};
