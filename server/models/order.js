const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Order = sequelize.define("Order", {
  orderId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  farmerIdNo: {
    type: DataTypes.NUMBER,
  },
  fertilizerName: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.DECIMAL,
  },
  orderStatus: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  currentOwner:{
    type:DataTypes.STRING,
    defaultValue:null,
  }
});

module.exports = Order;
