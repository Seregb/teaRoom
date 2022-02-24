'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({Comment}) {
      this.hasMany(Comment, {foreignKey: 'user_id'})
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
