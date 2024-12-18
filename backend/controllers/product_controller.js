var Product = require ("../models/product.js");

var product = function product(app, mongoose) {
    // ---------------GET LIST Setup ------------//
    app.get("/listProducts", async (req, res) => {
        try {
            const product = await Product.find({}).limit(100); // Mongoose query to find all products
            res.status(200).send(product);
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
    // ---------------GET LIST Setup ------------//

    // ---------------GET Setup ------------//
    app.get("/product/:productId", async (req, res) => {
        const id = req.params.id;
        console.log("Product to find :", id);

        try {
            const product = await Product.findOne({ productId: id }); // Using Mongoose to find the product by ID
            if (!product) {
                return res.status(404).send("Not Found");
            }
            res.status(200).send(product);
        } catch (error) {
            console.error("Error fetching product:", error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
    // ---------------GET Setup ------------//

    // ---------------POST Setup ------------//
    app.post("/product", async (req, res) => {
        try {
            console.log(req.body);
            const newProduct = new Product({
                imageURL: req.body.imageURL,
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
            });

            //Check if the body exists
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).send({ error: 'Bad request: No data provided.' });
            }

            // Save the new product to the database
            const savedProduct = await newProduct.save(); // Mongoose save operation
            res.status(200).send(savedProduct);
        } catch (error) {
            console.error("An error occurred:", error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });

    // ---------------POST Setup ------------//

    // ---------------DELETE Setup ------------//
    app.delete("/product/:productId", async (req, res) => {
        const id = req.params.id;
        console.log("Product to delete:", id);

        try {
            const productDeleted = await Product.findByIdAndDelete(id); // Mongoose delete operation
            if (!productDeleted) {
                return res.status(404).send("Not Found");
            }
            res.status(200).send(productDeleted);
        } catch (error) {
            console.error("Error deleting product:", error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });
    // ---------------DELETE Setup ------------//

    // ---------------PUT Setup ------------//
    app.put("/product/:productId", async (req, res) => {
        const id = req.params.productId;
        console.log("Product to Update:", id);
        console.log("Update Body", req.body)
        try {
            const updateData = {
                imageURL: req.body.imageURL,
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
            };

            const updatedProduct = await Product.findOneAndUpdate({productId: id}, updateData, { new: true }); // Mongoose update operation
            if (!updatedProduct) {
                return res.status(404).send("Not Found");
            }
            res.status(200).send(updatedProduct);
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });
    // ---------------PUT Setup ------------//
};
module.exports = product;