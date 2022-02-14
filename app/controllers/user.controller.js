const db = require("../models");
const CandidateProfile = db.candidateProfile;
const Op = db.Sequelize.Op;

// Create and Save a new Candidate
exports.createUpdate = async (req, res) => {
  //checkProfile
  const profile = await CandidateProfile.findOne({
    where: {
      userId: req.body.userId,
    },
  });

  // Validate request
  if (!req.body.name && !req.body.gender && !req.body.marital_status && !req.body.cnic) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

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
  }else{
    CandidateProfile.update(req.body, {
      where: { userId: req.body.userId }
    }).then(num => {
        if (num == 1) {
          res.status(200).send("update Successfully");
        }else{
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