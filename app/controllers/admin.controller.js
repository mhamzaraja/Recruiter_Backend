const { candidateProfile } = require("../models");
const db = require("../models");
const userJob = db.postJob;
const employerProfile=db.employerInfo;
const CandidateProfile=db.candidateProfile
const candidateEducation = db.candidateEducation;
const candidateExperience = db.userExperience;
const candidateProjects = db.candidateProjects;
const candidateSkills = db.candidateSkills;
const candidateLanguages = db.candidateLanguages;
const user=db.user

exports.showAllJobs = async (req, res) => {
    await userJob.findAll().then(data => {
        res.status(200).json({
            status: 200,
            success: true,
            data: data
        });
    }).catch(err => {
            res.status(500).json({
                status: 500,
                success: false,
                message: err.message || "Something Went wrong while requesting!"
            });
        });

};

exports.showJobById = async (req, res) => {
    const id = req.query.id;
    await userJob.findOne({
        where: { id }
    })
    .then(data => {
        res.status(200).json({
            status: 200,
            success: true,
            data: data
        });
    })
    .catch(err => {
        res.status(500).json({
            status: 500,
            success: false,
            message: err.message || "Something Went wrong while requesting!"
        });
    });
};

exports.showAllEmployerProfiles = async (req, res) => {

        await employerProfile.findAll()
            .then(data => {
                res.status(200).json({
                    status: 200,
                    success: true,
                    data: data
                });
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: err.message || "Something Went wrong while requesting!"
                });
            });
};

exports.showEmployerProfileById = async (req, res) => {
    const id = req.query.id;
    const employerId = req.userId;

    if (!employerId) {
        res.status(403).json({
            status: 403,
            success: false,
            message: "Unauthorize"
        });
    } else {
        await employerProfile.findOne({
            where: { id }
        })
            .then(data => {
                res.status(200).json({
                    status: 200,
                    success: true,
                    data: data
                });
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: err.message || "Something Went wrong while requesting!"
                });
            });
    }
};

exports.getUserById = async (req, res) => {
    const id = req.query.id;

    try {
      const profile = await user.findOne({
        include:[
              
            {model:candidateEducation},
            {model:candidateExperience},
            {model:candidateProjects},
            {model:candidateSkills},
            {model:candidateLanguages}
         

        ],
        where: {id:req.query.id},
      });

      const education = await candidateEducation.findOne({
        where: {id:req.query.id},
      });

      const experience = await candidateExperience.findOne({
        where: {id:req.query.id},
      });

      const projects = await candidateProjects.findOne({
        where: {id:req.query.id},
      });

      const skills = await candidateSkills.findOne({
        where: {id:req.query.id},
      });

      const languages = await candidateLanguages.findOne({
        where: {id:req.query.id},
      });


      if (!profile && !education && !projects && !skills && !languages) {
        res.status(500).json({
          status: 500,
          success: false,
          message: "cannot find user"
        });
      } else {
        res.status(200).json({
          status: 200,
          success: true,
          data:{profile}
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        success: false,
        message: err.message || "Something Went wrong while requesting!"
      });
    }

  }

  exports.getAllUsers = async (req, res) => {
    const userId = req.userId;

    try {
      const profile = await candidateProfile.findAll({

  
          // include:[
              
          //     {model:candidateEducation},
          //     {model:candidateExperience},
          //     {model:candidateProjects},
          //     {model:candidateSkills},
          //     {model:candidateLanguages}
           

          // ]
      });
      

      const education = await candidateEducation.findAll();

      const experience = await candidateExperience.findAll();

      const projects = await candidateProjects.findAll();

      const skills = await candidateSkills.findAll();

      const languages = await candidateLanguages.findAll();


      if (!profile && !education && !projects && !skills && !languages) {
        res.status(500).json({
          status: 500,
          success: false,
          message: "cannot find user"
        });
      } else {
        res.status(200).json({
          status: 200,
          success: true,
          data: [
            { profile }
          ]
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        success: false,
        message: err.message || "Something Went wrong while requesting!"
      });
    }
  } 