const User = require('../models/user');

var user = function user(app, upload){
     // ----------------------------------USERS ----------------------------------- //

    // ---------------GET LIST Setup ------------//
    app.get("/listUsers", async (req, res) => {
        try {
            const users = await User.find().limit(100);
            res.status(200).send(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    });
    // ---------------GET LIST Setup ------------//

    // ---------------GET Setup ------------//
    app.get("/users/:id", async (req, res) => {
        const id = Number(req.params.id);
        try {
            const user = await User.findOne({ userId: id });
            if (!user) {
                return res.status(404).send("User Not Found");
            }
            res.status(200).send(user);
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    });
    // ---------------GET Setup ------------//

    // ---------------POST Setup ------------//
    app.post("/users/signup", upload.single("imageURL"), async (req, res) => {
        try {
            const { name, password } = req.body;
            const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

            // Validate input
            if (!name || !password || !imageUrl) {
                return res.status(400).send({ error: "Bad Request: Missing required fields" });
            }

            const userCart = [];

            // Create and save the new user
            const newUser = new User({ name, password, imageURL: imageUrl, cart: userCart });
            const savedUser = await newUser.save();
            res.status(201).send(savedUser);

        } catch (error) {
            console.error("Error creating user:", error);
            if (error.code === 11000) {
                res.status(409).send({ error: "Conflict: User ID already exists" });
            } else {
                res.status(500).send({ message: "Internal Server Error" });
            }
        }
    });
    // ---------------POST Setup ------------//

    // ---------------DELETE Setup ------------//
    app.delete("/users/:id", async (req, res) => {
        const id = Number(req.params.id);
        try {
            const deletedUser = await User.findOneAndDelete({ userId: id });
            if (!deletedUser) {
                return res.status(404).send("User Not Found");
            }
            res.status(200).send(deletedUser);
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    });
    // ---------------DELETE Setup ------------//

    // ---------------PUT Setup ------------//
    app.put("/users/:id", async (req, res) => {
        const id = Number(req.params.id);
        const { name, password, imageUrl, cart } = req.body;
        try {
            const updatedUser = await User.findOneAndUpdate(
                { userId: id },
                { name, password, imageURL: imageUrl, cart },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).send("User Not Found");
            }
            res.status(200).send(updatedUser);
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    });
    // ---------------PUT Setup ------------//

    app.put("/users/:userId/cart", async (req, res) => {
        const { userId } = req.params;  // Read the userId from the URL parameters
        const { productId } = req.body; // Read the productId from the request body
    
        if (!productId) {
            return res.status(400).send({ error: "Bad Request: Missing productId" });
        }
    
        try {
            // Find the user by userId
            const user = await User.findOne({ userId });
    
            if (!user) {
                return res.status(404).send({ error: "User not found" });
            }
    
            // Check if the product is already in the user's cart
            if (user.cart.includes(productId)) {
                return res.status(400).send({ error: "Product is already in the cart" });
            }
    
            // Add the productId to the cart
            user.cart.push(productId);
    
            // Save the updated user
            const updatedUser = await user.save();
    
            res.status(200).send(updatedUser); // Respond with the updated user
        } catch (error) {
            console.error("Error updating cart:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    });
    
};

module.exports = user