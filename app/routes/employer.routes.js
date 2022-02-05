const { authJwt } = require("../middleware");
const jobPostController = require("../controllers/job.post.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    //job post
    app.post("/api/employer/job/create", jobPostController.saveJob);
    app.get("/api/employer/job/getAll", jobPostController.showJob);
    app.get("/api/employer/job/getOne/:id", jobPostController.showJobById);
    app.delete("/api/employer/job/delete/:id", jobPostController.deleteJob);
    app.put("/api/employer/job/update/:id", jobPostController.updateJob);

};