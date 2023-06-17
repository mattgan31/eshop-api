import _sequelize, { DataTypes } from 'sequelize';
const { Model, Sequelize } = _sequelize;
import {sequelize} from './init-models';

class orders extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    totalproduct: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    totalprice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "orders_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  },);
  }
  static beforeSave = async (order, options) => {
    const OrderDetail = Sequelize.models.orderDetail;

    try {
      const result = await OrderDetail.findAll({
        attributes: [[Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalQuantity']],
        where: { orderId: order.id },
      });

      const totalQuantity = result[0].dataValues.totalQuantity || 0;

      order.totalproduct = totalQuantity;
    } catch (error) {
      console.error(error);
      throw new Error('Error calculating total product');
    }
  };
}



export default orders;
