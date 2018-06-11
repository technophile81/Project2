// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our Credential model
module.exports = function (sequelize, DataTypes) {
    var Credential = sequelize.define("Credential", {
        credentialId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        // The credential source. Currently supported sources:
        // - local (in this local database)
        credentialSource: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // The credential name.
        //
        // For 'local' credentials, this is the user's sign-in name
        // (generally their email address).
        //
        // In the future, for (for example) Google support, this
        // would be the UID returned by Google.
        credentialName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        // The credential secret.
        //
        // For 'local' credentials, this is the hashed password.
        // This field is generally blank for non-local credentials.
        credentialSecret: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    Credential.associate = function (models) {
        Credential.belongsTo(models.User, {
          foreignKey: "userId"
        });
      };
    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    Credential.prototype.validPassword = function (password) {
        if (this.credentialSource !== 'local') {
            return false;
        }
        return bcrypt.compareSync(password, this.credentialSecret);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // For local users, we will automatically hash their password when it
    // is inserted into the database.
    Credential.hook("beforeCreate", function (cred) {
        if (cred.credentialSource === 'local') {
            cred.credentialSecret = bcrypt.hashSync(cred.credentialSecret, bcrypt.genSaltSync(10), null);
        }
    });
    return Credential;
};