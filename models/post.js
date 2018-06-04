module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      PostTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      PostContent: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      deleted: {
        type: DataTypes.BOOLEAN
      }
    });
    Post.associate = function(models) {

      Post.belongsTo(models.Thread, {
        foreignKey: {
          allowNull: false
        }
      });
      Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Post;
  };
  