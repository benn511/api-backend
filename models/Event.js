const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Event.init(sequelize, DataTypes);
}

class Event extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    event_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    event_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    event_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    event_owner: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Event',
    timestamps: false
  });
  return Event;
  }
}
