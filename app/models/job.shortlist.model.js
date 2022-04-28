module.exports = (sequelize, Sequelize) => {
    const shortlistCandidate = sequelize.define(
        "shortlist_candidate", {
            id:{
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            date:{
                type : Sequelize.STRING
            },
            time:{
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
  
    return shortlistCandidate;
  };