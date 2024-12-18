var mongoose = require('mongoose')

// user schema with a field `userId` that needs to be auto-incremented
const userSchema = new mongoose.Schema({
    userId: { type: Number, unique: true },
    imageURL: { type: String, required: true},
    name: { type: String, required: true },
    password: {type: String, required: true},
    cart: {type: Array, required: true},

});

// Pre-save hook to auto-increment `userId`
userSchema.pre('save', async function (next) {
if (this.isNew) {
    // Find the highest productId in the database and increment it by 1
    const lastUser = await mongoose.model("user").findOne().sort({ userId: -1 });
    if (lastUser) {
    this.userId = lastUser.userId + 1;
    } else {
    this.userId = 1; // If no users, start with 1
    }
}
next();
});

module.exports = mongoose.model('user', userSchema);
