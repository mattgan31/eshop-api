import models, { sequelize } from './../models/init-models';
const createOrder = async (req, res) => {
    const userId = req.user.id;
    const { orderDetails } = req.body;
    let totalQuantity = 0;
    let totalPrice = 0;
    let newQuantity;
    try {
        const transaction = await sequelize.transaction();
        const order = await models.orders.create({ user_id: userId });
        for (const orderDetail of orderDetails) {
            const { product_id, quantity } = orderDetail;
            const product = await models.product.findByPk(product_id);
            if (product.quantity < quantity) {
                return res.status(401).json({
                    status: 401,
                    error: 'Quantity of product is too low'
                });
            }
            const productPrice = product.price;
            await models.order_detail.create({ order_id: order.id, product_id, quantity });

            const newQuantity = product.quantity - quantity
            await models.product.update({ quantity: newQuantity }, {
                where: { id: product_id }
            });

            totalQuantity += quantity;
            totalPrice += quantity * productPrice;
        }
        order.totalproduct = totalQuantity;
        order.totalprice = totalPrice;
        order.user_id = userId;
        order.save();
        await transaction.commit();

        return res.status(200).json({
            status: 200,
            order
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

const showOrder = async(req, res) => {
    const userId = req.user.id;
    const orders = await models.orders.findAll({
        where: { user_id: userId }, include: { all: true }
    });

    if (!orders) {
        return res.status(404).json({
            status: 404,
            error: "Data not found"
        });
    }

    return res.json({
        status: 200,
        orders
    })
}

export default {
    createOrder,
    showOrder
}
