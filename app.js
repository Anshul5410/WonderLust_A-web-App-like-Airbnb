const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listings.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');


const MONGO_URL = "mongodb://127.0.0.1:27017/Wonderlust";
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res) =>{
    res.send("Hello World");
})


// index route
app.get("/listings", async(req,res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
})


//New Route
app.get("/listings/new", (req,res) =>{
    res.render("listings/new.ejs",)
})


//Show route
app.get("/listings/:id", async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

//Create Route
app.post("/listings", async(req,res) =>{
    // old method to write large code
    // let {title, description, image, price, country, location} = req.body;
    //old method to write large code
    // let listing = req.body.listing;
    // console.log(listing);
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

//Edit Route
app.get("/listings/:id/edit", async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing}); 
})

//Update Route
app.put("/listings/:id", async (req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})


// app.get("/testlisting", async (req,res)=>{
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By The Beach",
//         price: 1200,
//         location: "Calangute Goa",
//         country: "India",
//     });

//    await sampleListing.save();
//    console.log("sample was saved");
//    res.send("successful saved");
// });
app.listen(8080,() =>{
    console.log("server is listening to 8080")
});






// part 48 ka 2nd