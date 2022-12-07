const ProductData = require("../modules/productModel")


async function create(data) {
    return await ProductData.create(data);
}
 
async function read(filter, specificField) {
    return await ProductData.find(filter, specificField);
}

async function updateMany(ProductId, newData) {
    return await ProductData.updateMany(ProductId, newData);
}
 
async function del(ProductId) {
    return update(ProductId, {isActive : false});
}

module.exports = {del, updateMany, read, create}
