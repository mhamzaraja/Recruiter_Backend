const db = require("../models");
const userJob = db.postJob;
const favouriteJobs = db.favouriteJobs;

exports.showAllJobs = async (req, res) => {
  const pageNumber = req.query.page ? req.query.page - 1 : 1 - 1;
  const userId = req.query.userId ? req.query.userId : 0;
  const count = await userJob.count();
  if (userId) {
    await userJob
      .findAll({
        offset: pageNumber * 10,
        limit: 10,
        include: [{
          model: favouriteJobs,
          where: { userId: userId },
          required: false
        }]
      })
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
  }
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
  const countJobs = await userJob.count({
    where: {
      [Op.or]: [
        { job_title: { [Op.like]: `%${search}%` } },
        { company: { [Op.like]: `%${search}%` } },
        { job_location: { [Op.like]: `%${search}%` } },
        { required_career_level: { [Op.like]: `%${search}%` } },
        { workplace_type: { [Op.like]: `%${search}%` } }
      ],
    },
  });
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
        data: { jobsList: data, jobsCount: countJobs },
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
