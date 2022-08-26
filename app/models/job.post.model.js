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
                type : Sequelize.STRING
            },
            company : {
                type : Sequelize.STRING
            },
            workplace_type : {
                type : Sequelize.STRING
            },
            employment_type : {
                type : Sequelize.STRING
            },
            job_description : {
                type : Sequelize.STRING
            },
            no_of_positions : {
                type : Sequelize.INTEGER
            },
            minimum_qualification : {
                type : Sequelize.STRING
            },
            years_of_experience : {
                type : Sequelize.INTEGER
            },
            salary_range : {
                type : Sequelize.STRING
            },
            salary_visible : {
                type : Sequelize.BOOLEAN
            },
            created_date : {
                type : Sequelize.STRING
            },
            is_active : {
                type : Sequelize.BOOLEAN
            },
            is_sponser   : {
                type : Sequelize.BOOLEAN
            },
            authorization : {
                type : Sequelize.STRING
            }

        }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,         
          }
    );
  
    return Job;
  };