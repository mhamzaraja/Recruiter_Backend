const { authJwt } = require("../middleware");
const dataController =require('../controllers/dataAnalytics.controller')
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
   app.get('/api/admin/jobs/list/getAll', [authJwt.verifyToken, authJwt.isAdmin], adminController.showAllJobs);
   app.get("/api/admin/jobs/list/getOne", [authJwt.verifyToken, authJwt.isAdmin], adminController.showJobById);


   //Employer Details
   app.get("/api/admin/employer/profile/getOne", [authJwt.verifyToken, authJwt.isAdmin], adminController.showEmployerProfileById);
    app.get("/api/admin/employer/profile/getAll", [authJwt.verifyToken, authJwt.isAdmin], adminController.showAllEmployerProfiles);

    //Candidate Details
    app.get("/api/admin/user/profile/getOne", [authJwt.verifyToken,authJwt.isAdmin], adminController.getUserById);
    app.get("/api/admin/user/profile/getAll", [authJwt.verifyToken,authJwt.isEmployerOrAdmin], adminController.getAllUsers);

    //Data Analytics
    app.get("/api/admin/user/dataAnalytics", [authJwt.verifyToken], dataController.dataAnalytics);

} 


