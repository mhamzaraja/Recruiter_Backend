const { authJwt } = require("../middleware");
const adminController=require('../controllers/admin.controller')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

   //Jobs Details
   app.get('/api/admin/jobs/list/getAll', [authJwt.verifyToken], adminController.showAllJobs);
   app.get("/api/admin/jobs/list/getOne", [authJwt.verifyToken], adminController.showJobById);


   //Employer Details
   app.get("/api/admin/employer/profile/getOne", [authJwt.verifyToken], adminController.showEmployerProfileById);
    app.get("/api/admin/employer/profile/getAll", [authJwt.verifyToken], adminController.showAllEmployerProfiles);

    //Candidate Details
    app.get("/api/admin/user/profile/getOne", [authJwt.verifyToken], adminController.getUserById);
    app.get("/api/admin/user/profile/getAll", [authJwt.verifyToken], adminController.getAllUsers);
}