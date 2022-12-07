const { model } = require("mongoose");
const productController = require("../DL/controllers/product.controller");
// require("../DL/db")();


async function init() {
    try {
        const { status, newProduct } = await createNewProduct(product);
        console.log(status, newProduct);

        // const { updateStatus, updatedProduct } = await updateProduct(product.id, {inStock: 5});
        // console.log(updateStatus, updatedProduct);
    }
    catch(e) {
        console.log(e.message);
    }
}



async function createNewProduct(productData) {

    productValidation(productData);
    const exists = await productIsExists(productData.id);
    if (exists.length > 0) throw new Error("Product id already exists");

    const newProduct = await productController.create(productData);
    return {
        status: 'success',
        newProduct,
    }
}

async function updateProduct(productId, newData) {

    productValidation(newData);
    const exists = await productIsExists(productId);
    if (exists.length != 1 ) throw new Error("Invalid search ID");

    await productController.updateMany({id: productId}, newData);
    const updatedProduct = await productController.read({id: productId})
    return {
        updateStatus: 'success',
        updatedProduct,
    }
}

function productValidation(productData) {
    return true; // Need to add validation
}

async function productIsExists(id) {
    return await productController.read({id,});
}




let product = {
    id: 2,
    title: "airplane",
    price: 300,
    description: "lorem ipsum...",
    category: "electronics",
    image: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ioY9jnR7w52Y/v0/1200x-1.jpg",
    inStock: 10
}

init();