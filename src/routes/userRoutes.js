import { Router } from "express";
import indexControllers from "../controllers/indexControllers";
import middleware from "../middleware/verifyToken";

const route = Router();

route.post('/register', indexControllers.userControllers.createUser, indexControllers.customerControllers.createCustomer);
route.post('/login', indexControllers.userControllers.userLogin);
route.get('/profile', middleware.verifyToken, indexControllers.customerControllers.showCustomer);

export default route;
