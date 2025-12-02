const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://cd924:levydecisionlab@cluster0.0xvz0yw.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    console.log('Attempting connection...');
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB Atlas");
    
    const databases = await client.db().admin().listDatabases();
    console.log("✅ Databases:", databases.databases.map(db => db.name));
  } catch(error) {
    console.error("❌ Connection failed:", error.message);
  } finally {
    await client.close();
  }
}

run().catch(console.error);
