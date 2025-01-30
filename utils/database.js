import * as SQLite from "expo-sqlite";
import { Place } from "../model/place";

// const database = await SQLite.openDatabase("place.db");

// type Place = {
//   id: number;
//   title: string;
//   imageUri: string;
//   address: string;
//   lat: number;
//   lng: number;
// };

async function openDatabase() {
  const db = await SQLite.openDatabaseAsync("places.db", {
    useNewConnection: true,
  });
  return db;
}

const createTable = async (db) => {
  try {
    // await db.execAsync("DROP TABLE IF EXISTS places");
    await db.execAsync(`CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    )`);
    console.log("table created successfully");
  } catch (error) {
    console.log("creating table error", error);
  }
};

export const insertPlace = async (place) => {
  const db = await openDatabase();
  try {
    if (!place.title || !place.imageUri || !place.address || !place.location) {
      console.error("Missing place data:", place);
      return;
    }
    const result = await db.runAsync(
      "INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)",
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    );
    // console.log("Place inserted successfully", result);
    return result;
  } catch (error) {
    console.error("Error inserting place:", error);
  }
};

export const fetchPlaces = async () => {
  const db = await openDatabase();

  try {
    const result = await db.getAllAsync("SELECT * FROM places");

    const places = [];
    for (const data of result) {
      places.push(
        new Place(
          data.title,
          data.imageUri,
          {
            address: data.address,
            lat: data.lat,
            lng: data.lng,
          },
          data.id
        )
      );
    }
    // console.log("fetch places ", places);

    return places;
  } catch (error) {
    console.error("Error fetching places:", error);
  }
};
export const fetchPlaceById = async (id) => {
  const db = await openDatabase();

  try {
    const result = await db.getFirstAsync(
      "SELECT * FROM places WHERE id = ?",
      id
    );
    // console.log("Fetched place by id:", result);
    return result;
  } catch (error) {
    console.error("Error fetching places:", error);
  }
};

const checkTableSchema = async (db) => {
  try {
    const schema = await db.getAllAsync("PRAGMA table_info(places)");
    // console.log("Table schema:", schema);
  } catch (error) {
    console.error("Error checking table schema:", error);
  }
};

export async function runDatabaseOperations() {
  const db = await openDatabase();
  await createTable(db);
  // await checkTableSchema(db);
  // console.log("create table db", db);
  const newPlace = {
    id: 123,
    title: "New Place",
    imageUri: "place-image.jpg",
    address: "123 Main Street",
    location: { lat: 10.1234, lng: 20.5678 },
  };

  // await insertPlace(db, newPlace);
}

// export function init() {
//   const promise = new Promise((resolve, reject) => {
//     database.execAsync((tx) => {
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY NOT NULL,
//             title TEXT NOT NULL,
//             imageUri TEXT NOT NULL,
//             address TEXT NOT NULL,
//             lat REAL NOT NULL,
//             lng REAL NOT NULL
//           )`,
//         [],
//         () => {
//           tx.resolve();
//         },
//         (_, error) => {
//           tx.reject(error);
//         }
//       );
//     });
//   });

//   return promise;
// }
