var user = function user(app, client, db){
    // ----------------------------------USERS ----------------------------------- //
    // ---------------GET LIST Setup ------------//
    app.get("/listUsers", async (req, res) => {    
        // In the Body of the callback function 
        await client.connect();     
        console.log("Node connected successfully to GET MongoDB");  
        console.log(db.databaseName)
        const query = {};            
        const results = await db  
        .collection("users") 
        .find(query)
        .limit(100)
        .toArray();

        console.log(results);
        res.status(200);
        res.send(results);

    });
    // ---------------GET LIST Setup ------------//

    // ---------------GET Setup ------------//
    app.get("/users/:id", async (req, res) => {
        const id = req.params.id;
        console.log("user to find :", id);

        await client.connect();
        console.log("Node connected successfully to GET-id MongoDB");
        const query = {id : Number(id)};

        console.log(query)
        const results = await db.collection("users")
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
    app.post("/users", async (req, res) => {
        await client.connect();
        try {
            console.log(req.body)
            console.log("Node connected successfully to POST-id MongoDB");

            const newDocument = {
                "name": req.body.name,
                "password": req.body.password,
                "imageUrl": req.body.imageUrl,
                "cart": req.body.cart
            };
            const id = Number(req.body.id);
        
            // Check if the body exists
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).send({ error: 'Bad request: No data provided.' });
            }

            // Check if it already exists
            const existingDoc = await db
                .collection("users")
                .findOne({ id: Number(newDocument.id)});

            if (existingDoc) {
                return res
                    .status(409)
                    .send({ error: "Conflict: A user with this ID already exists."});
            }
            console.log(newDocument);
            
            const results = await db.collection("users").insertOne(newDocument);
            // Send Robot Added To Server
            const query = { id: id};
            const userAdded = await db.collection("users").findOne(query);
            res.status(200);
            res.send(productAdded);

        } catch (error) {
            console.error("An error occurred: ", error);
            res.status(500).send({error: 'An internal server error occurred'});

        }

    });

    // ---------------POST Setup ------------//

    app.delete("/users/:id", async (req, res) => {
        // Read Parameter id
        console.log(req.params)
        const id = Number(req.params.id);
        console.log("User to delete :", id);

        // Connect to MongoDB
        await client.connect();

        try {
            // Delete by its id
            const query = { id: id};
            
            // Before We Delete The Robot - Send Client the information
            const userDeleted = await db.collection("users").findOne(query);
            // Delete
            const results = await db.collection("users").deleteOne(query);
            // Response to Client
            res.status(200);
            res.send(userDeleted);
            console.log(results)
        }
        catch (error){
            console.error("Error deleting user:", error);
            res.status(500).send({ message: 'Internal Server Error'});
        }
    })

    app.put("/users/:id", async (req, res) => {
        const id = Number(req.params.id); // Read parameter id
        console.log("User to Update :",id);
        await client.connect(); // Connect Mongodb
        try {
            const query = { id: id }; // Update by its id
            // Data for updating the document, typically comes from the request body
            console.log(req.body);
            const updateData = {
                $set:{
                "name": req.body.name,
                "password": req.body.password,
                "imageUrl": req.body.imageUrl
                }
            };

            // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
            const options = { };
            const results = await db.collection("users").updateOne(query, updateData, options);
            
            // Send the client information
            const userUpdated = await db.collection("users").findOne(query);
            res.status(200); // Response to Client
            res.send(productUpdated);
        } catch {
            console.error("Error Updating product", error);
            res.status(500).send({ message: 'Internal Server Error'});
        }
    });
};

module.exports = user