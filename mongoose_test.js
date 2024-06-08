import "dotenv/config";
import mongoose from "mongoose";

async function connectToDatabase() {
  const uri = process.env.MONGO_URI;
  const dbNameURL = process.env.MONGODBNAME;
  if (!uri) {
    throw new Error("Missing MONGOURI environment variable");
  }

  await mongoose.connect(uri, {dbName: dbNameURL});
}

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  director: { type: String, required: true },
  genre: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Movie = mongoose.model("movies", movieSchema);

async function getOneMovie() {
  try {
    const movies = await Movie.findOne({});
    console.log("A movie", movies);
  } catch (err) {
    console.error("Error fetching movies:", err.message);
  }
}

async function main() {
  try {
    await connectToDatabase();
    await getOneMovie();
  } catch (err) {
    console.log(`It blew up! ${err}`);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
}

await main();

const e2a = async () => {
  try {
    await connectToDatabase();
    const result = await Movie
    .find({ year: { $gt:2000 } });
    return result;
  } catch (err) {
    console.log(`It blew up! ${err}`);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

const e2b = async () => {
  // all distinct languages in all movies
  try {
    await connectToDatabase();
    const result = await Movie
    .distinct("languages", { type: { $regex: "movie"}});
    return result;
  } catch (err) {
    console.log(`It blew up! ${err}`);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

const e2c = async () => {
  // All movie reated PG-13 and the casting included Ryan Gosling
  try {
    await connectToDatabase();
    const result = await Movie
    .find( {$and: [{rated: { $regex: "PG-13" }}, {cast: { $regex: "Ryan Gosling"}}]})
    .sort({released: 'asc'});
    return result;
  } catch (err) {
    console.log(`It blew up! ${err}`);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

const e2d = async () => {
  // Number of movies per gerne
  try {
    await connectToDatabase();
    const result = await Movie
    .aggregate([ { $match: { type: "movie"} } ])
    .unwind("genres")
    .group( { _id: "$genres", totalQuantity: { $sum: 1 } } );
    return result;
  } catch (err) {
    console.log(`It blew up! ${err}`);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

const e2e = async () => {
  // Number of movies per gerne
  try {
    await connectToDatabase();
    const result = await Movie
    .insertMany(
      {
        title: "CPSC2650",
        year: 2000,
        director: "Ting Hin Cheung",
        genre: "Crime"
      }
    )
    return result;
  } catch (err) {
    console.log(`It blew up! ${err}`);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

const e2f = async () => {
  // Number of movies per gerne
  try {
    await connectToDatabase();
    const result = await Movie
    .insertMany(
      {
        title: "CPSC2650",
        year: "whatever",
        director: "Ting Hin Cheung",
        genre: "Crime"
      }
    )
    return result;
  } catch (err) {
    console.log(`It blew up! ${err}`);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

const e2g = async () => {
  try {
    await connectToDatabase();
    const result = await Movie
    .find( { director: { $regex: "Ting Hin Cheung" } } );
    return result;
  } catch (e) {
    console.log(`It blew up! ${e}`);
  } finally {
    mongoose.connection.close();
  }
}

console.log(`All movies after year 2000 ----->`);
console.log( await e2a());

console.log(`All distinct languages in all movies ----->`);
console.log(await e2b());

console.log(`All distinct languages in all movies ----->`);
console.log(await e2c());

console.log(`Number of movies per gerne ----->`);
console.log(await e2d());

console.log(`Insert a movie with CPSC2650 as title and director as myself (Ting Hin Cheung) ----->`);
console.log(await e2e());

// console.log(`Insert a movie with CPSC2650 as title and director as myself (Ting Hin Cheung) with 'whatever' in year ----->`);
// console.log(await e2f());

// console.log(`Insert a movie with CPSC2650 as title and director as myself (Ting Hin Cheung) with 'whatever' in year ----->`);
// console.log(await e2g());
