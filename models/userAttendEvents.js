module.exports = function(sequelize, DataTypes){
    var UserAttendEvents = sequelize.define("userAttendEvents", {
        attending:{
            type: DataTypes.BOOLEAN
        }
    });

   
return UserAttendEvents;
//end of module.exports
};