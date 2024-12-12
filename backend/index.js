var express = require("express");
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser"); // Not Required on Slide 15

// ------------------------------------------//
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads")); // Serve images statically

// ---------------Connection Setup ------------//
const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

const { MongoClient } = require("mongodb"); // Add mongoDB 

// Constants for MongoDB
const url = "mongodb+srv://ecabelin:lTRqpSFjM5hlVUAr@coms319.fwqnb.mongodb.net/?retryWrites=true&w=majority&appName=COMS319";
const dbName = "coms319final";
const client = new MongoClient(url);
const db = client.db(dbName);

const prod = "product"
const user = "users"
const ord = "orders"

// ---------------Connection Setup ------------//

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

// ---------------------------------- Orders ----------------------------------- //




// ---------------GET LIST Setup ------------//
app.get("/listOrders", async (req, res) => {    // Changes to app.get("/listProducts")
    // In the Body of the callback function 
    await client.connect();     
    console.log("Node connected successfully to GET MongoDB");  
    console.log(db.databaseName)
    const query = {};            
    const results = await db  
      .collection("orders")  // Read the collection Robot from MongoDB Compass
      .find(query)
      .limit(100)
      .toArray();

    console.log(results);
    res.status(200);
    res.send(results);

});
// ---------------GET LIST Setup ------------//

// ---------------GET Setup ------------//
app.get("/orders/:id", async (req, res) => {
    const id = req.params.id;
    console.log("Order to find :", id);

    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {id : Number(id)};

    console.log(query)
    const results = await db.collection("orders")
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
app.post("/orders", async (req, res) => {
    await client.connect();
    try {
        console.log(req.body)
        console.log("Node connected successfully to POST-id MongoDB");

        const newDocument = {
            "name": req.body.name,
            "description": req.body.descriptionn,
            "deliveryDate": req.body.delDate,
            "orderDate": req.body.ordDate
        };
        const id = Number(req.body.id);
     
        // Check if the body exists
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: 'Bad request: No data provided.' });
        }

        // Check if it already exists
        const existingDoc = await db
            .collection("orders")
            .findOne({ id: Number(newDocument.id)});

        if (existingDoc) {
            return res
                .status(409)
                .send({ error: "Conflict: An order with this ID already exists."});
        }
        console.log(newDocument);
        
        const results = await db.collection("orders").insertOne(newDocument);
        
        const query = { id: id};
        const Added = await db.collection("orders").findOne(query);
        res.status(200);
        res.send(Added);

    } catch (error) {
        console.error("An error occurred: ", error);
        res.status(500).send({error: 'An internal server error occurred'});

    }

});

// ---------------POST Setup ------------//

app.delete("/orders/:id", async (req, res) => {
    // Read Parameter id
    console.log(req.params)
    const id = Number(req.params.id);
    console.log("order to delete :", id);

    // Connect to MongoDB
    await client.connect();

    try {
        // Delete by its id
        const query = { id: id};
        
        // Before We Delete The Orders - Send Client the information
        const Deleted = await db.collection("orders").findOne(query);
        // Delete
        const results = await db.collection("orders").deleteOne(query);
        // Response to Client
        res.status(200);
        res.send(Deleted);
        console.log(results)
    }
    catch (error){
        console.error("Error deleting order:", error);
        res.status(500).send({ message: 'Internal Server Error'});
    }
})

app.put("/orders/:id", async (req, res) => {
    const id = Number(req.params.id); // Read parameter id
    console.log("Order to Update :",id);
    await client.connect(); // Connect Mongodb
    try {
        const query = { id: id }; // Update by its id
        // Data for updating the document, typically comes from the request body
        console.log(req.body);
        const updateData = {
            $set:{
                "name": req.body.name,
                "description": req.body.descriptionn,
                "deliveryDate": req.body.delDate,
                "orderDate": req.body.ordDate
            }
        };

        // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
        const options = { };
        const results = await db.collection("orders").updateOne(query, updateData, options);
        
        // Send the client information
        const Updated = await db.collection("orders").findOne(query);
        res.status(200); // Response to Client
        res.send(Updated);
    } catch {
        console.error("Error Updating order", error);
        res.status(500).send({ message: 'Internal Server Error'});
    }
});