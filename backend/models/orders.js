var mongoose = require('mongoose')

// user schema with a field `userId` that needs to be auto-incremented
const orderSchema = new mongoose.Schema({
    orderId: { type: Number, unique: true },
    userId: { type: Number, unique: true },
    cart: {type: Array, required: true},

});

// Pre-save hook to auto-increment `userId`
orderSchema.pre('save', async function (next) {
if (this.isNew) {
    // Find the highest productId in the database and increment it by 1
    const lastOrder = await mongoose.model("order").findOne().sort({ orderId: -1 });
    if (lastOrder) {
    this.orderId = lastOrder.orderId + 1;
    } else {
    this.orderId = 1; // If no users, start with 1
    }
}
next();
});

module.exports = mongoose.model('order', orderSchema);
