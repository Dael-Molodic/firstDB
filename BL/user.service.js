const userController = require("../DL/controllers/user.controller");
require("../DL/modules/orderModel")
require("../DL/db")();




async function init() {
    try {
        // const { status, newUser } = await createNewUser(user);
        // console.log(status, newUser);

        const orderList = await getUserOrders(userId);
        console.log(orderList);
    }
    catch(e) {
        console.log(e.message);
    }
}


async function createNewUser(UserData) {

    UserValidation(UserData);
    const exists = await UserIsExists(UserData.email);
    if (exists.length > 0) throw new Error("User already exists");

    let newUser = userController.create(UserData);
    return {
        status: 'success',
        newUser,
    }
}

function UserValidation(UserData) {

    const USER_REGEX = /^[a-zA-Z]+$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const {
        fullName : {
            firstName,
            lastName,
        },
        userName,
        email,
        password,
        dob,
        createDate,
        permission,
        gender,
        isActive,
        orders,
    } = UserData;

    const errorMessage = {
        firstName: "User first name validation failed",
        lastName: "User last name validation failed",
        userName: "The 'userName' field is not allowed to be defined by the user",
        email: "Email validation failed",
        password: "Password validation failed",
        dob: "Date of birth validation failed",
        createDate: "The 'createDate' field is not allowed to be defined by the user",
        permission: "Permission validation failed",
        gender: "Gender validation failed",
        orders: "A user's orders data can only be updated when a new order is created.",
        isActive: "isActive validation failed"

    }

    if (!USER_REGEX.test(firstName.trim())) throw new Error(errorMessage.firstName);
    if (!USER_REGEX.test(lastName.trim())) throw new Error(errorMessage.lastName);
    if (userName) throw new Error(errorMessage.userName);
    if (!EMAIL_REGEX.test(email)) throw new Error(errorMessage.email);
    if (!PASSWORD_REGEX.test(password)) throw new Error(errorMessage.password);
    if (!(dob instanceof Date)) throw new Error(errorMessage.dob);
    if (createDate) throw new Error(errorMessage.createDate);
    if (permission && permission != "admin" && permission != "editor" && permission != "viewer") throw new Error(errorMessage.permission);
    if (gender != "male" && gender != "female") throw new Error(errorMessage.gender);
    if (orders) throw new Error(errorMessage.orders);
    if (isActive && typeof isActive != Boolean) throw new Error(errorMessage.isActive);
    
    return true;
}

async function getUserOrders(userId) {
    const user = await (await userController.read({_id: userId}))[0].populate('orders.orderId')
    if (isNaN(user?.length)) throw new Error("Invalid User ID");
   
    return user.orders;
}

async function UserIsExists(email) {
   return await userController.read({email,});
}




let userId = "63902b92a4d52a105b57bd1d";
let user = {
    fullName : {
        firstName : "Ziv",
        lastName : "Molodic"
    },
    email : "Ziv140@gmail.com",
    password : "Zivl111!",
    dob : new Date(1999, 10, 9),
    gender : "female"
}

init();