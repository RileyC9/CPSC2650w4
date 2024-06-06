import "dotenv/config.js";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to the MongoDB database");

    const db = client.db(process.env.MONGODBNAME);

    const movies = await db
      .collection("movies")
      .find({ title: { $regex: "Despicable", $options: "i" } })
      .project({ title: 1 })
      .toArray();
    // const after2000 = await db.collection("movies").find({year: {$gt:2000}}).project({title:1}).toArray();
    // console.log(after2000);
    console.log(movies);
    debugger;
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  } finally {
    await client.close();
  }
}

await connectToMongo();

const e1a = async () => {
  try {
    await client.connect();
    console.log("Connected to the MongoDB database");
    const db = client.db(process.env.MONGODBNAME);
    const after2000 = await db
    .collection("movies")
    .find( { year: { $gt:2000 } } )
    .project( { title: 1 } )
    .toArray();
    debugger;
    return after2000;
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  } finally {
    await client.close();
  }
};

const e1b = async () => {
  try {
    await client.connect();
    console.log("Connected to the MongoDB database");
    const db = client.db(process.env.MONGODBNAME);
    const distinctLanguage = await db
    .collection("movies")
    .distinct("languages");
    // .project( { title: 1 } )
    // .toArray();
    debugger;
    return distinctLanguage;
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  } finally {
    await client.close();
  }
};

const e1c = async () => {
  try {
    await client.connect();
    console.log("Connected to the MongoDB database");
    const db = client.db(process.env.MONGODBNAME);
    const result = await db
    .collection("movies")
    .find( {$and: [{rated: { $regex: "PG-13" }}, {cast: { $regex: "Ryan Gosling"}}]})
    .sort("released", 1)
    .project( { title: 1 } )
    .toArray();
    
    debugger;
    return result;
  } catch (err) {
    console.log("Failed to connect to NMongoDB", err);
  } finally {
    await client.close();
  }
}

const e1d = async () => {
  try {
    await client.connect();
    console.log("Connected to the MongoDB database");
    const db = client.db(process.env.MONGODBNAME);
    const result = await db
    .collection("movies")
    .aggregate([
      { $match: { type: "movie"} },
      { $unwind: "$genres"},
      { $group: {
        _id: "$genres",
        totalQuantity: { $sum: 1 }
      }}
    ])
    .toArray();
    debugger;
    return result;
  } catch (err) {
    console.log("Failed to connect to NMongoDB", err);
  } finally {
    await client.close();
  }
}

const e1e = async () => {
  try {
    await client.connect();
    console.log("Connected to the MongoDB database");
    const db = client.db(process.env.MONGODBNAME);
    const result = await db
    .collection("movies")
    .insertOne(
      {
        _id: "addEventListenerasdhji",
        title: "CPSC2650",
        directors: ["Ting Hin Cheung"]
      }
    )
    debugger;
    return result;
  } catch (err) {
    console.log("Failed to connect to NMongoDB", err);
  } finally {
    await client.close();
  }
}

console.log(`All movies after year 2000 ----->`);
console.log(await e1a());

console.log(`All distinct languages in all movies ----->`);
console.log(await e1b());

console.log(`All PG-13 movies casting Ryan Gosling, sorted by release date ----->`);
console.log(await e1c());

console.log(`Number of movies per gerne ----->`);
console.log(await e1d());

console.log(`Insert a movie with CPSC2650 as title and director as myself (Ting Hin Cheung) ----->`);
console.log(await e1e());