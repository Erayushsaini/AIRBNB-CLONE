const Listings = require("../model/listing");


const db=require("../config/db");
let express=require("express");

let data=require("./data");

let app=express();


async function main() {
    try {
        const connection=await db.getConnection();
        console.log(("database is connected"));
        connection.release();
    }
    catch(err) {
        console.error("database connection  failed:",err.message);
    }
}

main();


const initDb =async () => {

    try {
        let deletedRow=await Listings.deleteAll();
        
        console.log(`${deletedRow} listings are deleted `);

        //intialize the data

        let addedRow=await Listings.InsertMany(data.data);

        console.log("data base is initialized succesfully");
    }catch(err)  {
        console.log(err);
    }
}

initDb();