module.exports = (sequelize, Sequelize) => {
    const InterviewSchedule = sequelize.define(
        "interview_schedule", {
            id:{
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            startDate:{
                type : Sequelize.STRING
            },
            endDate:{
                type :Sequelize.STRING
            },
            startTime: {
                type : Sequelize.STRING
            },
            endTime : {
                type : Sequelize.JSON
            },
            location :{
                type:Sequelize.JSON
            },
            city :{
                type:Sequelize.JSON
            },
            comments :{
                type:Sequelize.JSON
            },
            status :{
                type:Sequelize.JSON
            },
            userTimezone :{
                type:Sequelize.JSON
            },
            utcTimezone :{
                type:Sequelize.JSON
            },
           
            attendees: { 
                type: Sequelize.STRING, 
                get: function() {
                    return JSON.parse(this.getDataValue('attendees'));
                }, 
                set: function(val) {
                    return this.setDataValue('attendees', JSON.stringify(val));
                }
            }
            

    
        }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,         
          }
    );
  
    return InterviewSchedule;
  };