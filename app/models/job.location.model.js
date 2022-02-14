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
                type : Sequelize.STRING,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must have a name for address' },
                            notEmpty: { msg: 'address name must not be empty' }
                        }
            },
            city : {
                type : Sequelize.STRING,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must have a name for city' },
                            notEmpty: { msg: 'city name must not be empty' }
                        }
            },
            country : {
                type : Sequelize.STRING,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must have a name for country' },
                            notEmpty: { msg: 'country name must not be empty' }
                        }
            }
        }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,         
          }
    );
  
    return JobLocation;
  };