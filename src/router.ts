import {NextFunction, Request, Response, Router} from "express";
import {body, oneOf, validationResult} from "express-validator"
import {handleInputErrors} from "./modules/middleware"
import {createProduct, getOneProduct, getProducts, deleteProduct, updateProduct} from './handlers/product'
import * as updateService from './handlers/update'
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

router.get("/update", updateService.getUpdates);
router.get("/update/:id", updateService.getOneUpdate);
router.post("/update",
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    handleInputErrors,
    updateService.createUpdate
    );
router.put("/update/:id",
    body('title').optional(),
    body('body').optional(),
    body('status').optional().isIn(['IN_PROGRESS', 'COMPLETED', 'PENDING']).withMessage('Invalid status'),
    body('version').optional(),
    handleInputErrors,
    updateService.updateUpdate
    );
router.delete("/update/:id", updateService.deleteUpdate);

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