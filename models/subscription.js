module.exports = function (sequelize, DataTypes) {

    var Subscription = sequelize.define('Subscription', {
        started: DataTypes.BOOLEAN
    });
    Subscription.associate = function (models) {
        models.User.belongsToMany(models.Thread, { through: 'Subscription', foreignKey: 'threadId', otherKey: 'userId' });
        models.Thread.belongsToMany(models.User, { through: 'Subscription', foreignKey: 'userId', otherKey: 'threadId' });
    };
    return Subscription;
};

