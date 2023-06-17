import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class customer extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
  }, {
    sequelize,
    tableName: 'customer',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "customer_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
