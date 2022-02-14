const { authJwt } = require("../middleware");
const employerProfileController = require("../controllers/employer.controller");
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
    app.post("/api/employer/profile/create", employerProfileController.saveEmployerProfile);
    app.get("/api/employer/profile", employerProfileController.showEmployerProfileData);
    app.delete("/api/employer/profile/delete", employerProfileController.deleteEmployerProfile);
    app.put("/api/employer/profile/update", employerProfileController.updateEmployerProfile);


    //job post
    app.post("/api/employer/job/create", jobPostController.saveJob);
    app.get("/api/employer/job", jobPostController.showJobData);
    app.delete("/api/employer/job/delete", jobPostController.deleteJob);
    app.put("/api/employer/job/update", jobPostController.updateJob);

    //job location
    app.post("/api/employer/jobLocation/create", jobLocationController.saveJobLocation);
    app.get("/api/employer/jobLocation", jobLocationController.showJobLocationData);
    app.delete("/api/employer/jobLocation/delete", jobLocationController.deleteJobLocation);
    app.put("/api/employer/jobLocation/update", jobLocationController.updateJobLocation);

    //job skills
    app.post("/api/employer/jobSkills/create", jobSkillsController.saveJobSkills);
    app.get("/api/employer/jobSkills", jobSkillsController.showJobSkillsData);
    app.delete("/api/employer/jobSkills/delete", jobSkillsController.deleteJobSkills);
    app.put("/api/employer/jobSkills/update", jobSkillsController.updateJobSkills);

};