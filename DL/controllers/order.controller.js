const orderData = require("../modules/orderModel")


async function create(data) {
    return await orderData.create(data);
}
 
async function read(filter, specificField) {
    return await orderData.find(filter, specificField);
}
 
async function updateOne(orderId, newData) {
    return await orderData.findOneAndUpdate(orderId, newData, { new: true });
}

async function updateMany(orderId, newData) {
    return await orderData.updateMany(orderId, newData);
}
 
async function del(orderId) {
    return update(orderId, {isActive : false});
}

module.exports = {del, updateOne, updateMany, read, create}
