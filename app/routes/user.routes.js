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
  app.get("/api/user/education/getAll", [authJwt.verifyToken], eduController.showEducation );
  app.get("/api/user/education/getOne/:id", eduController.showEducationById);
  app.delete("/api/user/education/delete/:id", [authJwt.verifyToken], eduController.deleteEducation );
  app.put("/api/user/education/update/:id", [authJwt.verifyToken], eduController.updateEducation );

  //projects
  app.post("/api/user/projects/create", projectsController.saveProjects);
  app.get("/api/user/projects/getAll", projectsController.showProjects);
  app.get("/api/user/projects/getOne/:id", projectsController.showProjectsById);
  app.delete("/api/user/projects/delete/:id", projectsController.deleteProjects);
  app.put("/api/user/projects/update/:id", projectsController.updateProjects);

  //skills
  app.post("/api/user/skills/create", skillsController.saveSkills);
  app.get("/api/user/skills/getAll", skillsController.showSkills);
  app.get("/api/user/skills/getOne/:id", skillsController.showSkillsById);
  app.delete("/api/user/skills/delete/:id", skillsController.deleteSkills);
  app.put("/api/user/skills/update/:id", skillsController.updateSkills);

  //languages
  app.post("/api/user/languages/create", languagesController.saveLanguages);
  app.get("/api/user/languages/getAll", languagesController.showLanguages);
  app.get("/api/user/languages/getOne/:id", languagesController.showLanguagesById);
  app.delete("/api/user/languages/delete/:id", languagesController.deleteLanguages);
  app.put("/api/user/languages/update/:id", languagesController.updateLanguages);
};
