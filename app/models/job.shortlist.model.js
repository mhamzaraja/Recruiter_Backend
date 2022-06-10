module.exports = (sequelize, Sequelize) => {
    const shortlistCandidate = sequelize.define(
        "shortlist_candidate", {
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
            startTime:{
                type : Sequelize.STRING
            },
            endTime:{
                type :Sequelize.STRING
            },
            Location : {
                type : Sequelize.STRING
            },
            comments : {
                type : Sequelize.STRING
            },
            status :{
                type:Sequelize.STRING
            },
            userTimezone:{
               type:Sequelize.STRING
            },
            utcTimezone:{
              type:Sequelize.STRING
            }
        }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,         
          }
    );
  
    return shortlistCandidate;
  };