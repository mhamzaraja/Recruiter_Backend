const jobsListController = require("../controllers/jobs.list.controller");
const applicationController = require("../controllers/application.controller");

module.exports = function (app) {

    //list of all jobs
    app.get("/api/jobs/list/getAll", jobsListController.showAllJobs);
    app.get("/api/jobs/list/getOne", jobsListController.showJobById);

    //job application
    app.post("/api/job/application/create", applicationController.saveApplication);
    // app.get("/api/job/application/getOne", applicationController.showApplicationById);
    // app.get("/api/job/application/getAll", applicationController.showAllApplications);
    // app.delete("/api/job/application/delete", applicationController.deleteApplication);
    // app.put("/api/job/application/update", applicationController.updateApplication);

};