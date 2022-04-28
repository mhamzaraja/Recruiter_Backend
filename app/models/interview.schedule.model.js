module.exports = (sequelize, Sequelize) => {
    const InterviewSchedule = sequelize.define(
        "interview_schedule", {
            id:{
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            date:{
                type : Sequelize.STRING
            },
            timeField:{
                type :Sequelize.STRING
            },
            city : {
                type : Sequelize.STRING
            },
            comments : {
                type : Sequelize.STRING
            },
            status :{
                type:Sequelize.STRING
            },
        }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,         
          }
    );
  
    return InterviewSchedule;
  };