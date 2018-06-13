module.exports = function (sequelize, DataTypes) {

    var Follower = sequelize.define("Follower", {

    });
    Follower.associate = function (models) {
        models.User.belongsToMany(models.User, { 
            as: 'Followers', 
            foreignKey: 'followedId', 
            through: 'Follower'
        });
        models.User.belongsToMany(models.User, { 
            as: 'Followeds', 
            foreignKey: 'followerId', 
            through: 'Follower'
        });
    }

    return Follower;
};