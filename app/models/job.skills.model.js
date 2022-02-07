module.exports = (sequelize, Sequelize) => {
    const JobSkills = sequelize.define(
        "job_skill", {
            id:{
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            skill_title : {
                type : Sequelize.STRING,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must have a name for skill' },
                            notEmpty: { msg: 'skill name must not be empty' }
                        }
            },
            skill_level : {
                type : Sequelize.STRING,
                allowNull: false,
                        validate: {
                            notNull: { msg: 'must have a level for skill' },
                            notEmpty: { msg: 'skill level must not be empty' }
                        }
            }
        }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,         
          }
    );
  
    return JobSkills;
  };