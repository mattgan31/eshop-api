const createProduct = async(req,res) => {
    const { name, description, category_id, price, quantity } = req.body;

    const product = await req.context.models.product.create({
        name,
        description,
        category_id,
        price,
        quantity,
        image: req.file.filename
    });

    return res.json({
        status: 200,
        data: product
    })
}

const showProduct = async (req, res) => {
    const product_category = await req.context.models.product_category.findAll({include:{all:true}});

    return res.json({
        status: 200,
        product_category
    });
}

export default {
    createProduct,
    showProduct
}
