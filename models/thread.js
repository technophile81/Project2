module.exports = function(sequelize, DataTypes) {
    var Thread = sequelize.define("Thread", {
      ThreadTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      ThreadAuthorUserID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      CatID: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
    Thread.associate = function(models) {
      Thread.belongsTo(models.Category, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    return Thread;
  };
  