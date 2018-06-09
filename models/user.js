// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
//var bcrypt = require("bcrypt-nodejs");
// Creating our User model

module.exports = function (sequelize, DataTypes) {

    var User = sequelize.define("User", {
        /* email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false
          }, */
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
                len: [1, 16]
            }
        },
        avatar: {
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
    };

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
 /*  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }; */
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
/*   User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  }); */



    return User;
};
