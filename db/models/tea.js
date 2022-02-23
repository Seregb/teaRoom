'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tea extends Model {
    static associate({Comment}) {
      this.hasMany(Comment, {foreignKey: 'tea_id'})
    }
  }
  Tea.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    place: DataTypes.STRING,
    img: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Tea',
  });
  return Tea;
};