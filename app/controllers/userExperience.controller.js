const db = require("../models");
const UserExperience = db.userExperience;
const Op = db.Sequelize.Op;

// Create a new Candidate
exports.createUserExperience = async (req, res) => {
    UserExperience.create(req.body)
    .then(data => {
        res.status(200).json({
            status: 200,
            success: true,
            data: req.body
          });
        })
        .catch(err => {
        res.status(500).json({
            status: 500,
            success: false,
            message: err.message || "Some error occurred!"
        });
    });
};

exports.getAllUserExperience = async (req, res) => {
    let userId = req.params.userId;
    await UserExperience.findAll({ 
        where: { userId }
    })
    .then(data => {
        res.status(200).json({
            status: 200,
            success: true,
            data: data
          });
        })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred!"
        });
      }); 
}

exports.getUserExperience = async (req, res) => {
    let userId = req.params.userId;
    await UserExperience.findOne({ 
        where: { userId }
    })
    .then(data => {
        res.status(200).json({
            status: 200,
            success: true,
            data: data
          });
        })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred!"
        });
      }); 
}

exports.updateUserExperience = async (req, res) => {
    UserExperience.update(req.body, {
        where: { userId: req.params.userId, id: req.params.id }
      }).then(num => {
        if (num == 1) {
            res.status(200).json({
                status: 200,
                success: true,
                data: req.body
            });
        }else{
            res.status(200).json(req.body);
        }
    })
    .catch(err => {
        res.status(500).json({
            status: 500,
            success: false,
            message: err.message || "Some error occurred!" + req.body.userId
        });
    });
};

exports.deleteUserExperience = async (req, res) => {
    let experience = await UserExperience.findOne({
        where: { userId: req.params.userId, id: req.params.id }
    })
    await experience.destroy().then(data => {
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
            message: err.message || "Some error occurred!" + req.body.userId
        });
    });
};