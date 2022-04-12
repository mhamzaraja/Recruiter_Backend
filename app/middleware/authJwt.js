const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isCandidate = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "candidate") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Candidate Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Candidate role!",
    });
  }
};
isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "super_user") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};

isEmployer = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "employer") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Employer Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Moderator role!",
    });
  }
};

isEmployerOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "employer") {
        return next();
      }

      if (roles[i].name === "super_admin") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Employer or Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Employer or Admin role!",
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isEmployer,
  isEmployerOrAdmin,
  isCandidate
};
module.exports = authJwt;