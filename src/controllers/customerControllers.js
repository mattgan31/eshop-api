const createCustomer = async (req, res) => {
    if (req.body.firstname == '') {
        return res.status(401).send({
            status: 401,
            message: "Username is required"
        });
    } else if (req.body.lastname == '') {
        return res.status(401).send({
            status: 401,
            message: "Password is required"
        });
    }
    try {
        const customer = await req.context.models.customer.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            user_id: req.user.id
        });
        return res.json({
            status: 200,
            customer
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
}


const showCustomer = async(req, res) => {
    const { id } = req.user;
    const currentUser = await req.context.models.users.findByPk(id, { include: { all: true } });

    return res.json({
        status: 200,
        customer: {
            username: currentUser.username,
            password: currentUser.password,
            data_customer: currentUser.customers
        }
    });

}

export default {
    createCustomer,
    showCustomer
}
