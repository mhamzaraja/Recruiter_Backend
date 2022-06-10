const { authJwt } = require("../middleware");
const jobsListController = require("../controllers/jobs.list.controller");
const applicationController = require("../controllers/application.controller");
const interviewScheduleController=require("../controllers/interview.schedule.controller");
const shortlistController=require("../controllers/job.shortlist.controller");

module.exports = function (app) {

    //list of all jobs
    app.get("/api/jobs/list/getAll", jobsListController.showAllJobs);
    app.get("/api/jobs/list/getOne", jobsListController.showJobById);

    //job application
    app.post("/api/job/application/create", [authJwt.verifyToken,authJwt.isCandidate], applicationController.saveApplication);
    app.get("/api/job/application/getOne", [authJwt.verifyToken], applicationController.showApplicationById);
    // app.get("/api/job/application/getAll", applicationController.showAllApplications);
    app.delete("/api/job/application/deletee",[authJwt.verifyToken,authJwt.isEmployerOrAdmin], applicationController.deleteApplication);
    app.put("/api/job/application/update",[authJwt.verifyToken, authJwt.isAdmin], applicationController.updateApplication);

    // Shortlisted Candidates
    app.post("/api/job/shortlist/create",[authJwt.verifyToken], shortlistController.saveShortlistCandidate);
    app.get("/api/job/shortlist/getOne",[authJwt.verifyToken], shortlistController.showShortlistCandidatebyId);
    app.get("/api/job/shortlist/getAll",[authJwt.verifyToken], shortlistController.showAllShortListCandidate);
    app.put("/api/job/shortlist/update",[authJwt.verifyToken], shortlistController.updateShortlistCandidate);

    // Interview Schedule 
    app.post("/api/job/interview/create",[authJwt.verifyToken], interviewScheduleController.savescheduleInterview);
    // app.get("/api/job/interview/getOne",[authJwt.verifyToken], interviewScheduleController.showscheduleInterviewById);
    app.get("/api/job/interview/getAll",[authJwt.verifyToken], interviewScheduleController.showAllscheduleInterview);
    app.put("/api/job/interview/update",[authJwt.verifyToken], interviewScheduleController.updatescheduleInterview);


};      