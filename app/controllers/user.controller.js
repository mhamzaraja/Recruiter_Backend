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

exports.getProfileById = async (req, res) => {
  //checkProfile
  const profile = await CandidateProfile.findOne({
    where: {
      userId: req.body.userId,
    },
  });

  if (!profile) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "cannot find user"
    });
  } else {
    res.status(200).json({
      status: 200,
      success: true,
      data: profile
  });
  }
};

exports.getCompleteProfileByUserId = async (req, res) => {
  //checkProfile
  const profile = await CandidateProfile.findOne({
    where: {
      userId: req.body.userId,
    },
  });

  if (!profile) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "cannot find user"
    });
  } else {
    res.status(200).json({
      status: 200,
      success: true,
      data: profile
  });
  }
};