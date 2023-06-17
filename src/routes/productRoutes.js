import { Router } from "express";
import indexControllers from "../controllers/indexControllers";
import middleware from "../middleware/uploadFile";

const route = Router();

route.post('/', middleware.upload, indexControllers.productControllers.createProduct);
route.get('/', middleware.upload, indexControllers.productControllers.showProduct);

export default route;
