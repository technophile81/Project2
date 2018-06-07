module.exports = function (sequelize, DataTypes) {

    var Subscription = sequelize.define('Subscription', {
        viewed: DataTypes.DATE
    });
    Subscription.associate = function (models) {
        models.User.belongsToMany(models.Thread, { 
            as: 'Subscriptions', 
            through: 'Subscription', 
            foreignKey: 'userId', 
            otherKey: 'threadId'
        });

        models.Thread.belongsToMany(models.User, { 
            as: 'Subscribers', 
            through: 'Subscription', 
            foreignKey: 'threadId', 
            otherKey: 'userId'
        });
    };
    return Subscription;
};

