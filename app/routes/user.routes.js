const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const educationController = require("../controllers/user.education.controller");
const projectsController = require("../controllers/user.projects.controller");
const skillsController = require("../controllers/user.skills.controller");
const languagesController = require("../controllers/user.languages.controller");
const experienceController = require("../controllers/userExperience.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user/profile/create",  [authJwt.verifyToken], controller.createUpdate);
  app.get("/api/user/profile",  [authJwt.verifyToken], controller.getUserData);

  //Education
  app.post("/api/user/education/create",  [authJwt.verifyToken], educationController.saveEducation);
  app.get("/api/user/education",  [authJwt.verifyToken], educationController.showEducationData);
  app.delete("/api/user/education/delete",  [authJwt.verifyToken], educationController.deleteEducation );
  app.put("/api/user/education/update",  [authJwt.verifyToken], educationController.updateEducation );
  

  //projects
  app.post("/api/user/projects/create/",  [authJwt.verifyToken], projectsController.saveProjects);
  app.get("/api/user/projects",  [authJwt.verifyToken], projectsController.showProjectsData);
  app.delete("/api/user/projects/delete",  [authJwt.verifyToken], projectsController.deleteProjects);
  app.put("/api/user/projects/update",  [authJwt.verifyToken], projectsController.updateProjects);

  //skills
  app.post("/api/user/skills/create",  [authJwt.verifyToken], skillsController.saveSkills);
  app.get("/api/user/skills",  [authJwt.verifyToken], skillsController.showSkillsData);
  app.delete("/api/user/skills/delete",  [authJwt.verifyToken], skillsController.deleteSkills);
  app.put("/api/user/skills/update",  [authJwt.verifyToken], skillsController.updateSkills);

  //languages
  app.post("/api/user/languages/create",  [authJwt.verifyToken], languagesController.saveLanguages);
  app.get("/api/user/languages",  [authJwt.verifyToken], languagesController.showLanguagesData);
  app.delete("/api/user/languages/delete",  [authJwt.verifyToken], languagesController.deleteLanguages);
  app.put("/api/user/languages/update",  [authJwt.verifyToken], languagesController.updateLanguages);

  // User Experience
    app.post("/api/user/experience/create", [authJwt.verifyToken], experienceController.createUserExperience );
    app.get("/api/user/experience/getAll/:userId", [authJwt.verifyToken], experienceController.getAllUserExperience );
    app.get("/api/user/experience/get/:userId&:id", [authJwt.verifyToken], experienceController.getUserExperience );
    app.post("/api/user/experience/update/:userId&:id", [authJwt.verifyToken], experienceController.updateUserExperience );
    app.delete("/api/user/experience/delete/:userId&:id", [authJwt.verifyToken], experienceController.deleteUserExperience );

};
