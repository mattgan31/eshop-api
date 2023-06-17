import 'dotenv/config';
import express from 'express';
import models, { sequelize } from './models/init-models';
import routes from './routes/indexRoutes';

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    req.context = { models }
    next();
});

app.get('/', (req, res) => {
    res.json({
        status: 200,
        message: "Welcome to E-Shop"
    })
});
app.use('/products', routes.productRoutes);
app.use('/orders', routes.orderRoutes);
app.use('/users', routes.userRoutes);

const dropDatabaseSync = false;

sequelize.sync({ force: dropDatabaseSync }).then(async () => {
    if (dropDatabaseSync) {
        console.log("Database do not drop");
    }
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    })
})

export default app;
