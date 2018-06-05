module.exports = function (sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        CategoryID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        CategoryName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    Category.associate = function (models) {

        Category.hasMany(models.Thread);
    };
    return Category;
};
