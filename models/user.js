module.exports = function (sequelize, DataTypes) {

    var User = sequelize.define("User", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 32]
            }
        },
        avatar: {
            type: DataTypes.STRING
        },
        coverImg: {
            type: DataTypes.STRING
        },
        rank: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        branch: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        deployment: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 56]
            }
        },
        mos: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 26]
            }
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    });
    User.associate = function (models) {
        User.hasMany(models.Thread, {
            foreignKey: "userId"
        });
        User.hasMany(models.Post, {
            foreignKey: "userId",
            onDelete: "cascade"
        });
        User.hasMany(models.Subscription, {
            foreignKey: "userId",
        });
        User.hasMany(models.Follower, {
            foreignKey: "followerId",
        });
        User.hasMany(models.Follower, {
            foreignKey: "followedId",
        });
        User.belongsToMany(models.CalEvent, {
            as: "OwnedEvent", 
            through: "Event_Creators", 
            foreignKey:"EventCreator"});
        //relationship with users to track event attendance
        User.belongsToMany(models.CalEvent, {
            as: "Event_ID", 
            through:"UserAttendEvents", 
            foreignKey: "User_Id"});
        //relationship with event comments
        User.belongsToMany(models.EventComments, {
            as: "EventComment_ID", 
            through:"UserEventComments",  
            foreignKey: "User_Id"});
    };

    return User;
};
