module.exports = (sequelize, Sequelize) => {
    const InterviewSchedule = sequelize.define(
        "interview_schedule", {
            id:{
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            summary:{
                type : Sequelize.STRING
            },
            location:{
                type :Sequelize.STRING
            },
            description: {
                type : Sequelize.STRING
            },
            start : {
                type : Sequelize.JSON
            },
            end :{
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