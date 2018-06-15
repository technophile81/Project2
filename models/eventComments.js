module.exports = function(sequelize, DataTypes){
    var EventComments = sequelize.define("EventComments", {
        content:{
            type: DataTypes.TEXT,
            allowNull: false,
            
        }
    });

    EventComments.associate = function(models){
        //****change user depending on name of model in other file
        //many to many relationship with users
        models.EventComments.belongsToMany(models.User, {as: "User_Id", through: "UserEventComments", foreignKey: "EventComment_ID"});
        //one to many relationship with event comments
        models.EventComments.belongsToMany(models.CalEvent, {as: "Event_Id", through: "EventandComments", foreignKey:"EventComment_ID"});
    };
return EventComments;
//end of module.exports
};