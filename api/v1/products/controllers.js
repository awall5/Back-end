const { Product } = require("../../../models/product_schema");

const createProductController = async (req, res) => {
  try {
    const data = req.body;
    console.log("creating product...", data);

    // Remove keys with null or empty string values
    // This is to ensure that we don't store empty fields in the database
    Object.keys(data).forEach((key) => {
      if (data[key] == null || data[key] == "") {
        delete data[key];  
      }
    });

    let newProduct = await Product.create(data);
    res.status(201).json({
      isSuccess: true,
      message: `Product created`,
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    if (err.name === "ValidationError" || err.code == "11000") {
      res
        .status(400)
        .json({ isSuccess: false, message: `Err: ${err.message}`, data: {} });
    }
    console.log("🔴 Error in createProductController");
    res
      .status(501)
      .json({ isSuccess: false, message: "Internal Server Error", data: {} });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json({
      isSuccess: true,
      message: "Product List Fetched",
      data: {
        products: allProducts,
      },
    });
  } catch (error) {
    console.log("🔴 Error in createProductController");
    res
      .status(501)
      .json({ isSuccess: false, message: "Internal Server Error", data: {} });
  }
};

const updateProductControler = async (req, res) => {
  try {
    const { productId } = req.params;
    const newData = req.body;
    const newProduct = await Product.findByIdAndUpdate(productId, newData, {
      new: true, //returns new data
      runValidators: true, // check Schema again while updating
    });

    if (newProduct === null) {
      res.status(400);
      res.json({
        isSuccess: false,
        message: "Invalid product ID",
        data: {},
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Product List Updated",
      data: {
        products: newProduct,
      },
    });
  } catch (error) {
    console.log("🔴 Error in updateProductControler", error.message);
    res
      .status(501)
      .json({ isSuccess: false, message: "Internal Server Error", data: {} });
  }
};

const deleteProductControler = async (req, res) => {
  try {
    const { productId } = req.params;
    const delProduct = await Product.findByIdAndDelete(productId);
    if (delProduct) {
      res.status(200).json({
        isSuccess: false,
        message: "Invalid Id ",
      });
    }
  } catch (error) {
    console.log("🔴 Error in updateProductControler", error.message);
    res
      .status(400)
      .json({ isSuccess: false, message: "Internal Server Error", data: {} });
  }
};

module.exports = {
  createProductController,
  getAllProducts,
  updateProductControler,
  deleteProductControler,
};
