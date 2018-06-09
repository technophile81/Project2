module.exports = function (sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    Category.associate = function (models) {
        Category.hasMany(models.Thread, {
            foreignKey: "categoryId"
        });
    };
    return Category;
};
