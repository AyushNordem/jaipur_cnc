const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
console.log("Connecting to MongoDB URI...");

mongoose.connect(uri)
  .then(async () => {
    console.log("SUCCESS: Connected to MongoDB Atlas!");
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("Collections in DB:", collections.map(c => c.name));
    
    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      console.log(`- Collection '${col.name}': ${count} documents`);
    }
    
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("ERROR Connecting to MongoDB Atlas:", err.message);
    process.exit(1);
  });
