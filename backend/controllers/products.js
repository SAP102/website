const Products = require('../models/Products')
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createProduct = async (req, res) => {
   const {filename} = req.file
   
    const data = new Products({
        name: req.body.name,
        image: filename,
        description: req.body.description,
        Company: req.body.Company,
        category: req.body.category,
        price: req.body.price
      })
      data.save().then((result) => {
        res.status(StatusCodes.CREATED).send({message:"product add sucses", result})
    })
}

const getAllProducts = async (req, res) => {
  try {
        const products = await Products.find({});
        res.status(StatusCodes.OK).json({ products });
    } catch (error) {
        console.log('somthing wrong')
    }
}; 

// const getImage = async(req, res)=>{
//   try {
//     const products = await Products.find({image});
//     res.status(200).json({ products });
// } catch (error) {
//     console.log('somthing wrong')
// }
// }



const getSingleProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Products.findOne({ _id: productId });
    if (!product) {
      throw new CustomError.NotFoundError(`No product with id:${productId}`);
    }
    res.json({ product });
};

const updateProduct = async (req, res) => {
    const { id: productId } = req.params;
    const  filename = req.file;
    const product = await Products.findOneAndUpdate({ _id: productId },{ 
        name: req.body.name,
        image: req.file.filename,
        description: req.body.description,
        Company: req.body.Company, 
        category: req.body.category,
        price: req.body.price}, {
      new: true, 
      runValidators: true,
    });
    if (!product) {
      throw new CustomError.NotFoundError(`No product with id:${productId}`);
    }
    res.json({ product, message:'updete product' });
  };

const deleteProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Products.findOne({ _id: productId });
    if (!product) {
      throw new CustomError.NotFoundError(`No product with id:${productId}`);
    }
    await product.remove();
    res.json({ msg: "Success! Product removed." });
};

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,

}