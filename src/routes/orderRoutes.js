import { Router } from "express";
import indexControllers from "../controllers/indexControllers";
import middleware from "../middleware/verifyToken";

const route = Router();

route.post('/', middleware.verifyToken, indexControllers.orderControllers.createOrder);
route.get('/', middleware.verifyToken, indexControllers.orderControllers.showOrder);

export default route;
