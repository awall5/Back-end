const express = require("express");
const {
  createProductController,
  getAllProducts,
  updateProductControler,
  deleteProductControler,
} = require("./controllers.js");

const productRouter = express.Router();

productRouter.get("/", getAllProducts);

productRouter.post("/", createProductController);

productRouter.patch("/:productId", updateProductControler);

productRouter.delete("/:productId", deleteProductControler);

module.exports = { productRouter };
