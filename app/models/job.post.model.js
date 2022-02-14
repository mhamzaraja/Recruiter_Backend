module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define(
        "job", {
            id:{
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            job_title : {
                type : Sequelize.STRING,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must have a title for job' },
                            notEmpty: { msg: 'job title must not be empty' }
                        }
            },
            company : {
                type : Sequelize.STRING,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must have a name for company' },
                            notEmpty: { msg: 'company name must not be empty' }
                        }
            },
            workplace_type : {
                type : Sequelize.STRING,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must have a type for workplace' },
                            notEmpty: { msg: 'workplace type must not be empty' }
                        }
            },
            employment_type : {
                type : Sequelize.STRING,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must have a type for employment' },
                            notEmpty: { msg: 'employment type must not be empty' }
                        }
            },
            job_description : {
                type : Sequelize.STRING,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must have a description for job' },
                            notEmpty: { msg: 'job description must not be empty' }
                        }
            },
            no_of_positions : {
                type : Sequelize.INTEGER,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must have a number of positions' },
                            notEmpty: { msg: 'number of positions must not be empty' }
                        }
            },
            minimum_qualification : {
                type : Sequelize.STRING,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must have a title for minimum qualification' },
                            notEmpty: { msg: 'minimum qualification title must not be empty' }
                        }
            },
            years_of_experience : {
                type : Sequelize.INTEGER,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must have a vaue for experience' },
                            notEmpty: { msg: 'experience vaue must not be empty' }
                        }
            },
            salary_range : {
                type : Sequelize.STRING,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must have a range for salary' },
                            notEmpty: { msg: 'salary range must not be empty' }
                        }
            },
            salary_visible : {
                type : Sequelize.BOOLEAN,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must choose an option' }
                        }
            },
            created_date : {
                type : Sequelize.STRING,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must have a date of creation' },
                            notEmpty: { msg: 'date of creation must not be empty' }
                        }
            },
            is_active : {
                type : Sequelize.BOOLEAN,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must choose an option' }
                        }
            },
            is_sponser   : {
                type : Sequelize.BOOLEAN,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must choose an option' }
                        }
            },
            authorization : {
                type : Sequelize.STRING,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must have a value for authorization' },
                            notEmpty: { msg: 'authorization value must not be empty' }
                        }
            }

        }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,         
          }
    );
  
    return Job;
  };