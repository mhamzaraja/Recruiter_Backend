const { authJwt } = require("../middleware");
// const controller = require("../controllers/employer.controller");
const jobPostController = require("../controllers/job.post.controller");
const jobLocationController = require("../controllers/job.location.controller");
const jobSkillsController = require("../controllers/job.skills.controller");


module.exports = function (app) {
    //     app.use(function (req, res, next) {
    //         res.header(
    //             "Access-Control-Allow-Headers",
    //             "Origin, Content-Type, Accept"
    //         );
    //         next();
    //     });

    //employer
    // app.post("/api/employer/profile", controller.createUpdate);


    //job post
    app.post("/api/employer/job/create", jobPostController.saveJob);
    app.get("/api/employer/job/getAll", jobPostController.showAllJobs);
    app.get("/api/employer/job/getOne/:id", jobPostController.showJobById);
    app.delete("/api/employer/job/delete/:id", jobPostController.deleteJob);
    app.put("/api/employer/job/update/:id", jobPostController.updateJob);

    //job location
    app.post("/api/employer/jobLocation/create", jobLocationController.saveJobLocation);
    app.get("/api/employer/jobLocation/getAll", jobLocationController.showAllJobsLocation);
    app.get("/api/employer/jobLocation/getOne/:id", jobLocationController.showJobLocationById);
    app.delete("/api/employer/jobLocation/delete/:id", jobLocationController.deleteJobLocation);
    app.put("/api/employer/jobLocation/update/:id", jobLocationController.updateJobLocation);

    //job skills
    app.post("/api/employer/jobSkills/create", jobSkillsController.saveJobSkills);
    app.get("/api/employer/jobSkills/getAll", jobSkillsController.showAllJobsSkills);
    app.get("/api/employer/jobSkills/getOne/:id", jobSkillsController.showJobSkillsById);
    app.delete("/api/employer/jobSkills/delete/:id", jobSkillsController.deleteJobSkills);
    app.put("/api/employer/jobSkills/update/:id", jobSkillsController.updateJobSkills);

};