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
        res.send(data);
        res.status(200).send({
          message: "Register Successfully!"
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  } else {
    CandidateProfile.update(req.body, {
      where: { userId: req.body.userId }
    }).then(num => {
      if (num == 1) {
        res.status(200).send("update Successfully");
      } else {
        res.status(200).send(req.body);
      }
    })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + req.body.userId
        });
      });
  }
};

exports.getUserData = async (req, res) => {
  const id = req.query.id;
  const userId = req.query.userId;
  
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
      res.status(500).send({
        message:
          err.message || "Something Went wrong while requesting!"
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
      res.status(500).send({
        message:
          err.message || "Something Went wrong while requesting!"
      });
    }
  }
}