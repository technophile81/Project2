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
            validate: {
                len: [1, 16]
            }
        },
        branch: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 16]
            }
        },
        deployment: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 26]
            }
        },
        mos: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 26]
            }
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [1, 32]
            }
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
        User.belongsToMany(User, { 
            as: 'Followers', 
            foreignKey: 'followedId', 
            through: models.Follower
        });
        User.belongsToMany(User, { 
            as: 'Followeds', 
            foreignKey: 'followerId', 
            through: models.Follower 
        });
    };

    return User;
};
