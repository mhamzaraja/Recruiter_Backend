const db = require("../models");
const CandidateProfile = db.candidateProfile;
const candidateEducation = db.candidateEducation;
const candidateProjects = db.candidateProjects;
const candidateSkills = db.candidateSkills;
const candidateLanguages = db.candidateLanguages;

const Op = db.Sequelize.Op;

// Create and Save a new Candidate
exports.createUpdate = async (req, res) => {
  //checkProfile
  const profile = await CandidateProfile.findOne({
    where: {
      userId: req.body.userId,
    },
  });

  if (!profile) {
    CandidateProfile.create(req.body)
      .then(data => {
        res.status(200).json({
          status: 200,
          success: false,
          message: "Created Successfully!",
          data: data
        });
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          success: false,
          message: err.message || "Some error occurred while creating."
        });
      });
  } else {
    CandidateProfile.update(req.body, {
      where: { userId: req.body.userId }
    }).then(num => {
      if (num == 1) {
        res.status(200).json({
          status: 200,
          success: false,
          message: "Updated Successfully"
        });
      } else {
        res.status(500).json({
          status: 500,
          success: false,
          message: "No changes were made!"
        });
      }
    })
      .catch(err => {
        res.status(500).json({
          status: 500,
          success: false,
          message: "Error updating with id=" + req.body.userId
        });
      });
  }
};

exports.getUserData = async (req, res) => {
  const id = req.query.id;
  const userId = req.userId;
  
  // remove userId

  if (!id) {
    try {
      const profile = await CandidateProfile.findAll({
        where: { userId }
      });

      const education = await candidateEducation.findAll({
        where: { userId }
      });

      const projects = await candidateProjects.findAll({
        where: { userId }
      });

      const skills = await candidateSkills.findAll({
        where: { userId }
      });

      const languages = await candidateLanguages.findAll({
        where: { userId }
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
          data: [
            { profile },
            { education },
            { projects },
            { skills },
            { languages },
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
  } else {
    try {
      const profile = await CandidateProfile.findOne({
        where: { id, userId }
      });

      const education = await candidateEducation.findOne({
        where: { id, userId }
      });

      const projects = await candidateProjects.findOne({
        where: { id, userId }
      });

      const skills = await candidateSkills.findOne({
        where: { id, userId }
      });

      const languages = await candidateLanguages.findOne({
        where: { id, userId }
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
          data: [
            { profile },
            { education },
            { projects },
            { skills },
            { languages },
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
}