'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Tea }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Tea, { foreignKey: 'tea_id' });
    }
  }
  Comment.init(
    {
      user_id: DataTypes.INTEGER,
      text: DataTypes.TEXT,
      tea_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
};
