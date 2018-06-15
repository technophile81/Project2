module.exports = function(sequelize, DataTypes){
    var CalEvent = sequelize.define("CalEvent", {
        eventName:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {max: 140}

        },
        category:{
            type: DataTypes.STRING,
            allowNull: false
        },
        eventDate:{

            type: DataTypes.DATEONLY,
            allowNull: false,
            validate:{isDate: true}

        },
        startTime:{
            type: DataTypes.TIME,
            allowNull: false

        },
        endTime:{
            type: DataTypes.TIME,
            allowNull: false

        },
        timezone:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "CST"
        },
        address1:{
            type: DataTypes.STRING,
            allowNull: false

        },
        address2:{
            type: DataTypes.STRING,

        },
        city:{
            type: DataTypes.STRING,
            allowNull: false

        },
        state:{
            type: DataTypes.STRING,
            allowNull: false

        },
        postalCode:{
            type: DataTypes.INTEGER,
            allowNull: false

        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {min: 3, max: 400}

        },
        imageUrl:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:"/images/alex-martinez-43505-unsplash.jpg"

        }
    });

    CalEvent.associate = function(models){
        //****change user depending on name of model in other file
        //many to one association with events to track event ownership
        models.CalEvent.belongsToMany(models.User, {as:"EventCreator" , through: "Event_Creators", foreignKey:"OwnedEvent"});

        //many to many relationship with users
        models.CalEvent.belongsToMany(models.User, {as: "User_Id", through: "UserAttendEvents", foreignKey: "Event_ID"});

        //one to many relationship with event comments
        models.CalEvent.belongsToMany(models.EventComments, {as: "EventComment_ID",  through: "EventandComments", foreignKey: "Event_ID"});

    };
return CalEvent;
//end of module.exports
};