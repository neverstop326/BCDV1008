const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    order_type: String,
    item: {
        type: String,
        require: true
    },
    customer: {
        type: String,
        require: true
    }
});

const Order = mongoose.model("Order", orderSchema, "Orders");
module.exports = Order;