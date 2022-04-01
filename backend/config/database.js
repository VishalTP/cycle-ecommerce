const mongoose = require("mongoose");
// "mongodb+srv://Vishaltpkln:Vishal@1996@cluster0.zlm9p.mongodb.net/Ecommerce?retryWrites=true&w=majority"
//"mongodb://localhost:27017/Ecommerce"
const connectDatabase = () => {
  mongoose
    .connect("mongodb+srv://Vishaltpkln:Vishal@1996@cluster0.zlm9p.mongodb.net/Ecommerce?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
