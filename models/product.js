'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.categories, { foreignKey: 'categoryId', as: 'categories' });
    }
  }
  product.init({
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};