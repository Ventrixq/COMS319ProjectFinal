var product = function product(app, client, db){
        // ---------------GET LIST Setup ------------//
    app.get("/listProducts", async (req, res) => {    // Changes to app.get("/listProducts")
        // In the Body of the callback function 
        await client.connect();     
        console.log("Node connected successfully to GET MongoDB");  
        console.log(db.databaseName)
        const query = {};            
        const results = await db  
        .collection("product") 
        .find(query)
        .limit(100)
        .toArray();

        console.log(results);
        res.status(200);
        res.send(results);

    });
    // ---------------GET LIST Setup ------------//

    // ---------------GET Setup ------------//
    app.get("/product/:id", async (req, res) => {
        const id = req.params.id;
        console.log("Product to find :", id);

        await client.connect();
        console.log("Node connected successfully to GET-id MongoDB");
        const query = {id : Number(id)};

        console.log(query)
        const results = await db.collection("product")
            .findOne(query);
        console.log(dbName)
        //console.log(results.collection)
        console.log("Results :", results);
        if (!results)
            res.send("Not Found").status(404);
        else
            res.send(results).status(200);
    });
    // ---------------GET Setup ------------//

    // ---------------POST Setup ------------//
    app.post("/product", async (req, res) => {
        await client.connect();
        try {
            console.log(req.body)
            console.log("Node connected successfully to POST-id MongoDB");

            const newDocument = {
                //"id": req.body.id,
                "name": req.body.name,
                "price": req.body.price,
                "description": req.body.description,
                "imageUrl": req.body.imageUrl,
                "userID" : req.body.userID
            };
            const id = Number(req.body.id);
        
            // Check if the body exists
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).send({ error: 'Bad request: No data provided.' });
            }

            // Check if it already exists
            const existingDoc = await db
                .collection("product")
                .findOne({ id: Number(newDocument.id)});

            if (existingDoc) {
                return res
                    .status(409)
                    .send({ error: "Conflict: A robot with this ID already exists."});
            }
            console.log(newDocument);
            
            const results = await db.collection("product").insertOne(newDocument);
            // Send Robot Added To Server
            const query = { id: id};
            const productAdded = await db.collection("product").findOne(query);
            res.status(200);
            res.send(productAdded);

        } catch (error) {
            console.error("An error occurred: ", error);
            res.status(500).send({error: 'An internal server error occurred'});

        }

    });

    // ---------------POST Setup ------------//

    app.delete("/product/:id", async (req, res) => {
        // Read Parameter id
        console.log(req.params)
        const id = Number(req.params.id);
        console.log("Product to delete :", id);

        // Connect to MongoDB
        await client.connect();

        try {
            // Delete by its id
            const query = { id: id};
            
            const productDeleted = await db.collection("product").findOne(query);
            // Delete
            const results = await db.collection("product").deleteOne(query);
            // Response to Client
            res.status(200);
            res.send(productDeleted);
            console.log(results)
        }
        catch (error){
            console.error("Error deleting product:", error);
            res.status(500).send({ message: 'Internal Server Error'});
        }
    })

    app.put("/product/:id", async (req, res) => {
        const id = Number(req.params.id); // Read parameter id
        console.log("Product to Update :",id);
        await client.connect(); // Connect Mongodb
        try {
            const query = { id: id }; // Update by its id
    
            console.log(req.body);
            const updateData = {
                $set:{
                "name": req.body.name,
                "price": req.body.price,
                "description": req.body.description,
                "imageUrl": req.body.imageUrl,
                "userID" : req.body.userID
                }
            };

            const options = { };
            const results = await db.collection("product").updateOne(query, updateData, options);
            
            // Send the client information
            const productUpdated = await db.collection("product").findOne(query);
            res.status(200); // Response to Client
            res.send(productUpdated);
        } catch {
            console.error("Error Updating product", error);
            res.status(500).send({ message: 'Internal Server Error'});
        }
    });
    
};

module.exports = product