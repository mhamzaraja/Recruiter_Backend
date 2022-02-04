const db = require("../models");
const UserExperience = db.userExperience;
const Op = db.Sequelize.Op;

// Create a new Candidate
exports.createUserExperience = async (req, res) => {
    UserExperience.create(req.body)
    .then(data => {
        // res.send(data);
        res.status(200).send({
            message: "User Experience Created Successfully!"
        });
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Error occurred while creating the user experience!"
        });
    });
};

exports.updateUserExperience = async (req, res) => {
    UserExperience.update(req.body, {
        where: { userId: req.body.userId }
      }).then(num => {
        if (num == 1) {
        res.status(200).send("User Experience Updated Successfully!");
        }else{
        res.status(200).send(req.body);
        }
    })
    .catch(err => {
        res.status(500).send({
        message: "Error occurred while updating the user experience!" + req.body.userId
        });
    });
};