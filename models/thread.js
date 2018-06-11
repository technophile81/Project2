module.exports = function(sequelize, DataTypes) {
    var Thread = sequelize.define("Thread", {
      threadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      threadTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });

    Thread.associate = function(models) {
      Thread.belongsTo(models.Category, {
        foreignKey: "categoryId"
      });
      Thread.belongsTo(models.User, {
        foreignKey: "userId"
      });
      Thread.hasMany(models.Post, {
        foreignKey: "threadId"
      });
      Thread.hasMany(models.Subscription, {
        foreignKey: "threadId",
      });
    };
    /* Thread.addScope("all", {
      include: {postId: Post.postId}
    }) */
  

    return Thread
/*     .scope("all")
    .findAndCountAll({ where: {}, offset: 0, distinct:true }); */
  };
  