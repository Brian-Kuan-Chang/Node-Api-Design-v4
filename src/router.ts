import {Router} from "express";
import {body, oneOf, validationResult} from "express-validator"
import {handleInputErrors} from "./modules/middleware"
import {createProduct, getOneProduct, getProducts, deleteProduct, updateProduct} from './handlers/product'

const router = Router();
/**
 * Product
 */
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.post("/product", body("name").isString(), handleInputErrors, createProduct);
router.put("/product/:id", body("name").isString(), handleInputErrors, updateProduct);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", (req, res) => {
});

router.get("/update/:id", (req, res) => {
});

router.post("/update",
    body('title').exists().isString(),
    body('body').exists().isString(),
    (req, res) => {
    });
const validStatuses = ['IN_PROGRESS', 'COMPLETED', 'PENDING'];
router.put("/update/:id",
    body('title').optional(),
    body('body').optional(),
    body('status').optional().isIn(validStatuses).withMessage('Invalid status'),
    body('version').optional(),
    (req: any, res: any) => {
    });

router.delete("/update/:id", (req, res) => {
});

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {
});

router.get("/updatepoint/:id", (req, res) => {
});

router.post("/updatepoint", (req, res) => {
});

router.put("/updatepoint/:id", (req, res) => {
});

router.delete("/updatepoint/:id", (req, res) => {
});

export default router;