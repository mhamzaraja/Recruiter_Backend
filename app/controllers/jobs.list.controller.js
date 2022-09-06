const db = require("../models");
const userJob = db.postJob;

exports.showAllJobs = async (req, res) => {
  const pageNumber = req.page ? req.page - 1 : 1 - 1;
  const count = await userJob.count();
  await userJob
    .findAll({ offset: pageNumber * 10, limit: 10 })
    .then((data) => {
      res.status(200).json({
        status: 200,
        success: true,
        data: { jobsList: data, jobsCount: count },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        success: false,
        message: err.message || "Something Went wrong while requesting!",
      });
    });
};
exports.showJobsBySearch = async (req, res) => {
  const pageNumber = req.body.page ? req.body.page - 1 : 1 - 1;
  const search = req.body.search;
  const Op = db.Sequelize.Op;
  await userJob
    .findAll({
      where: {
        [Op.or]: [
          { job_title: { [Op.like]: `%${search}%` } },
          { company: { [Op.like]: `%${search}%` } },
          { job_location: { [Op.like]: `%${search}%` } },
          { required_career_level: { [Op.like]: `%${search}%` } },
          { workplace_type: { [Op.like]: `%${search}%` } }
        ],
      },
      offset: pageNumber * 10,
      limit: 10,
    })
    .then((data) => {
      res.status(200).json({
        status: 200,
        success: true,
        data: { jobsList: data, jobsCount: data.length },
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        success: false,
        message: err.message || "Something Went wrong while requesting!",
      });
    });
};

exports.showJobById = async (req, res) => {
  const id = req.query.id;
  await userJob
    .findOne({
      where: { id },
    })
    .then((data) => {
      res.status(200).json({
        status: 200,
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        success: false,
        message: err.message || "Something Went wrong while requesting!",
      });
    });
};
