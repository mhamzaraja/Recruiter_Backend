module.exports = (sequelize, Sequelize) => {
    const JobLocation = sequelize.define(
        "job_location", {
            id:{
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            address : {
                type : Sequelize.STRING
            },
            city : {
                type : Sequelize.STRING
            },
            country : {
                type : Sequelize.STRING
            }
        }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,         
          }
    );
  
    return JobLocation;
  };