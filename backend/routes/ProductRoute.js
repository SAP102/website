const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer')
const {verify}=require('../middleware/auth')

const {createProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct, } = require('../controllers/products')

router.post('/api/createProduct',verify,upload.single('image'),createProduct)
router.get('/api/products',verify,getAllProducts)

router
    .route('/api/products/:id')
    .get(verify,getSingleProduct)
    .put(verify,upload.single('image'), updateProduct)
    .delete(verify,deleteProduct)

// router.get('/api/products/:filename',getImage)

module.exports = router;
 