const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const eduController = require("../controllers/user.education.controller");
const projectsController = require("../controllers/user.projects.controller");
const skillsController = require("../controllers/user.skills.controller");
const languagesController = require("../controllers/user.languages.controller");

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
  app.get("/api/user/education/getAll/:userId", [authJwt.verifyToken], eduController.showEducation );
  app.get("/api/user/education/getOne/:id&:userId", [authJwt.verifyToken], eduController.showEducationById);
  app.delete("/api/user/education/delete/:id&:userId", [authJwt.verifyToken], eduController.deleteEducation );
  app.put("/api/user/education/update/:id&:userId", [authJwt.verifyToken], eduController.updateEducation );

  //projects
  app.post("/api/user/projects/create/", [authJwt.verifyToken], projectsController.saveProjects);
  app.get("/api/user/projects/getAll/:userId", [authJwt.verifyToken], projectsController.showProjects);
  app.get("/api/user/projects/getOne/:id&:userId", [authJwt.verifyToken], projectsController.showProjectsById);
  app.delete("/api/user/projects/delete/:id&:userId", [authJwt.verifyToken], projectsController.deleteProjects);
  app.put("/api/user/projects/update/:id&:userId", [authJwt.verifyToken], projectsController.updateProjects);

  //skills
  app.post("/api/user/skills/create", [authJwt.verifyToken], skillsController.saveSkills);
  app.get("/api/user/skills/getAll/:userId", [authJwt.verifyToken], skillsController.showSkills);
  app.get("/api/user/skills/getOne/:id&:userId", [authJwt.verifyToken], skillsController.showSkillsById);
  app.delete("/api/user/skills/delete/:id&:userId", [authJwt.verifyToken], skillsController.deleteSkills);
  app.put("/api/user/skills/update/:id&:userId", [authJwt.verifyToken], skillsController.updateSkills);

  //languages
  app.post("/api/user/languages/create", [authJwt.verifyToken], languagesController.saveLanguages);
  app.get("/api/user/languages/getAll/:userId", [authJwt.verifyToken], languagesController.showLanguages);
  app.get("/api/user/languages/getOne/:id&:userId", [authJwt.verifyToken], languagesController.showLanguagesById);
  app.delete("/api/user/languages/delete/:id&:userId", [authJwt.verifyToken], languagesController.deleteLanguages);
  app.put("/api/user/languages/update/:id&:userId", [authJwt.verifyToken], languagesController.updateLanguages);
};
