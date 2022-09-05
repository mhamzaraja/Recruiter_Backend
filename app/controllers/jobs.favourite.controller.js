const db = require("../models");
const userJob = db.postJob;
const favouriteJobs = db.favouriteJobs;

exports.showAllFavouriteJobs = async (req, res) => {
  const userId = req.query.userId;
  if (userId) {
    await userJob
      .findAll({
        include: [{
          model: favouriteJobs,
          where: { userId: userId }
        }]
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
  }
  else {
    res.status(500).json({
      status: 500,
      success: false,
      message: "UserId is required"
    });
  }
};

exports.saveFavouriteJob = async (req, res) => {
  const userId = req.body.userId;
  const jobId = req.body.jobId;
  const favouriteJob = await favouriteJobs.findOne({
    where: { userId,jobId}
  });
  if (favouriteJob)
  {
    res.status(200).json({
      status: 200,
      success: true,
      message: "Created Successfully",
      data: favouriteJob
    });
  }
  else{
    await favouriteJobs.create(req.body).then(data => {
      res.status(200).json({
        status: 200,
        success: true,
        message: "Created Successfully",
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

exports.deleteFavouriteJob = async (req, res) => {
  const id = req.query.id;
  try {
      const favouriteJob = await favouriteJobs.findOne({
          where: { id }
      });
      await favouriteJob.destroy().then(data => {
          res.status(200).json({
              status: 200,
              success: true,
              message: "Deleted Successfully",
              data: data
          });
      }).catch(err => {
          res.status(500).json({
              status: 500,
              success: false,
              message: err.message || "Something Went wrong while requesting!"
          });
      });
  } catch (err) {
      res.status(500).json({
          status: 500,
          success: false,
          message: err.message || "Something Went wrong while requesting!"
      });
  }
};


