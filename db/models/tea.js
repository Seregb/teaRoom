'use strict';
const { BOOLEAN } = require('sequelize');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tea extends Model {
    static associate({ Comment }) {
      this.hasMany(Comment, { foreignKey: 'tea_id' });
    }
  }
  Tea.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      place: DataTypes.STRING,
      img: {
        type: DataTypes.TEXT,
        isUrl: true,
      },
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Tea',
    }
  );
  return Tea;
};
