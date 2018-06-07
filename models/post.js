module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    postTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    postContent: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    threadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN
    }
  });
  Post.associate = function (models) {
    Post.belongsTo(models.Thread, {
      foreignKey: "threadId"
    });
    Post.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };
  return Post;
};
