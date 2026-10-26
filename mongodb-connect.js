const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://<username>:<Password>@localhost?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Create connection
    await client.db("users").createCollection("userList");

    // Insert a record
    await client.db("users").collection('userList').insertOne({
      name : 'Sangwin',
      email : 'sangwin@example.com'
    });

    // Find a record
    var dbo = client.db("users");
    const datas = await dbo.collection("userList").findOne({ _id: new ObjectId("<ID>") });

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);