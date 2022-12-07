const userData = require("../modules/userModel")


async function create(data) {
    return await userData.create(data);
}
 
async function read(filter, specificField) {
    return await userData.find(filter, specificField)
}
 
async function updateOne(userId, newData) {
    return await userData.findOneAndUpdate(userId, newData, { new: true }) // no validation!!
}

async function updateMany(userId, newData) {
    return await userData.updateMany(userId, newData) 
}
 
async function del(userId) {
    return update(userId, {isActive : false});
}

module.exports = {del, updateOne, updateMany, read, create}
