var mongoose = require('mongoose')

// Product schema with a field `productId` that needs to be auto-incremented
const productSchema = new mongoose.Schema({
    productId: { type: Number, unique: true },
    imageURL: { type: String, required: true},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },

});

// Pre-save hook to auto-increment `productId`
productSchema.pre('save', async function (next) {
if (this.isNew) {
    // Find the highest productId in the database and increment it by 1
    const lastProduct = await mongoose.model("product").findOne().sort({ productId: -1 });
    if (lastProduct) {
    this.productId = lastProduct.productId + 1;
    } else {
    this.productId = 1; // If no products, start with 1
    }
}
next();
});

module.exports = mongoose.model('product', productSchema);
