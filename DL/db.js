const mongoose = require('mongoose');
const MONGO_URL = "mongodb+srv://013172465:013172465@cluster0.1au93jk.mongodb.net/Shop?retryWrites=true&w=majority";

async function connect() {

    try {
        mongoose.connect(MONGO_URL, 
            {useNewUrlParser: true, useUnifiedTopology: true},
            (err) => {
                if (err) throw "ErrorDB : "+ err;
                console.log("conction success", mongoose.connection.readyState); // state of connection
                
            })
    }
    catch (error) {
        console.log(error);
        throw err;
    }
   
}

module.exports = connect;
