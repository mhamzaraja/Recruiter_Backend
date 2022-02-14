const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const educationController = require("../controllers/user.education.controller");
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

  app.post("/api/user/profile/create", controller.createUpdate);
  app.get("/api/user/profile", controller.getUserData);

  //Education
  app.post("/api/user/education/create", educationController.saveEducation);
  app.get("/api/user/education", educationController.showEducationData);
  app.delete("/api/user/education/delete", educationController.deleteEducation );
  app.put("/api/user/education/update", educationController.updateEducation );

  //projects
  app.post("/api/user/projects/create/", projectsController.saveProjects);
  app.get("/api/user/projects", projectsController.showProjectsData);
  app.delete("/api/user/projects/delete", projectsController.deleteProjects);
  app.put("/api/user/projects/update", projectsController.updateProjects);

  //skills
  app.post("/api/user/skills/create", skillsController.saveSkills);
  app.get("/api/user/skills", skillsController.showSkillsData);
  app.delete("/api/user/skills/delete", skillsController.deleteSkills);
  app.put("/api/user/skills/update", skillsController.updateSkills);

  //languages
  app.post("/api/user/languages/create", languagesController.saveLanguages);
  app.get("/api/user/languages", languagesController.showLanguagesData);
  app.delete("/api/user/languages/delete", languagesController.deleteLanguages);
  app.put("/api/user/languages/update", languagesController.updateLanguages);
};
