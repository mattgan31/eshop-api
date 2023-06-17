import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class product extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'product_category',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'product',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "product_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
