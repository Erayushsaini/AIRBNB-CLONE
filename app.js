const express=require("express");

let path=require("path");

const db=require("./config/db");
const Listings = require("./model/listing");
const ejsMate=require("ejs-mate");

const port=3030;

let app=express();


app.engine("ejs",ejsMate);

app.set("view engine" ,"ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")))

let methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))



//db connection 

async function main() {
    try {
        const connection=await db.getConnection();
        console.log(("database is connected"));
        connection.release();
        app.listen(port,() => {
            console.log(`server is listening at port ${port}`);
        })
    }
    catch(err) {
        console.error("database connection  failed:",err.message);
    }
}

main();

app.get("/" ,(req,res) => {
    res.render("listings/home.ejs");
})



//REST API

//get request for all listings


app.get("/listings" , async (req,res) => {
    let data=await Listings.findAll();

    res.render("listings/listing.ejs",{data});
    
})

//new and create api

app.get("/listings/new" ,(req,res) => {
    res.render("listings/new.ejs");
})


app.post("/listings", async (req,res) => {
    let listing=req.body.listing
    let id= await Listings.create(listing);
    res.redirect("/listings");
})


//edit request

app.get("/listings/:id/edit" ,async (req,res) => {
    let {id}=req.params;
    let listing=await Listings.findbyId(id);
    console.log("edit route");
    res.render("listings/edit.ejs",{listing});
})

//update route

app.put("/listings/:id" ,async (req,res) => {
    let {id}=req.params;
    let listing=req.body.listing;
    await Listings.findByIdAndUpdate(id,listing);

    res.redirect(`/listings/${id}`);
})  

//delete route

app.delete("/listings/:id" , async (req,res) => {
    let {id}= req.params;
    let deletedListings=await Listings.findByIdAndDelete(id);
    console.log(deletedListings);
    res.redirect("/listings");
})

//get for id 

app.get("/listings/:id" ,async(req,res) => {
    let {id}=req.params;
    let data=await Listings.findbyId(id);
    res.render("listings/listById.ejs",{data});
})

