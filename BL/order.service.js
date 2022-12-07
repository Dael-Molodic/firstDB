const mongoose = require("mongoose");
const orderController = require("../DL/controllers/order.controller");
const productController = require("../DL/controllers/product.controller")
const userController = require("../DL/controllers/user.controller")
// require("../DL/db")();




async function init() {
    try {
        // const { status, newOrder } = await createNewOrder(order);
        // console.log(status, newOrder);

        const { addStatus, newOrder } = await addProduct(order.id, productId);
        console.log(addStatus, newOrder);
    }
    catch(e) {
        console.log(e.message);
    }
}



async function createNewOrder(orderData) {

    orderValidation(orderData);
    const exists = await orderIsExists(orderData.id);
    if (exists.length > 0) throw new Error("Order id already exists");

    const newOrder = await (await orderController.create(orderData)).populate(['userId','products.productId']);
    addOrderToUser(newOrder._id, newOrder.userId);
    return {
        status: 'success',
        newOrder,
    }
}

async function addOrderToUser(ordetId, userId) {
    await userController.updateOne({_id: userId}, {$push: {orders: {orderId: ordetId}}})
    await (await userController.read({_id: userId}))[0].populate('orders.orderId')
}

async function addProduct(orderId, productId) {

    const orderExists = await orderIsExists(orderId);
    if (orderExists.length != 1 ) throw new Error("Invalid order ID");

    const productExists = await productIsExists(productId);
    if (productExists.length != 1 ) throw new Error("Invalid product ID");

    let originalOrder = orderExists[0].products;

    for (i of originalOrder) {
        if (i.productId == productId) {
            i.quantity += 1;
            await addOneToExistingProduct(orderId, originalOrder);
            return {
                addStatus: 'success',
                newOrder: await orderController.read({id: orderId})
            }
        }
    }

    return addNewProduct(orderId, productId);    
}

async function addNewProduct(orderId, productId) {

    await orderController.updateOne({id: orderId}, {$push: {
        products: {productId, quantity: 1}
    }})
    
    const newOrder = await (await orderController.read({id: orderId}))[0].populate('products.productId')
    return {
        addStatus: 'success',
        newOrder,
    }
}

function orderValidation(orderData) {
    return true; // Need to add validation
}

async function orderIsExists(id) {
    return await orderController.read({id,});
}

async function productIsExists(_id) {
    return await productController.read({_id,});
}

async function addOneToExistingProduct(orderId, newProducts) {
    await orderController.updateMany({id: orderId}, {products : newProducts,});
    return;
}





const productId = '63902d11d60acb70c916d36b';
let order = {
    id: 1,
    userId: '63902b92a4d52a105b57bd1d',
    products : [{productId, quantity: 1}]
}

init();