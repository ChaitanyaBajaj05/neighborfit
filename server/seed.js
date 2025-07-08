const mongoose = require("mongoose");
require("dotenv").config();
const Neighborhood = require("./models/Neighborhood");

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");

    Neighborhood.insertMany([
        { name: "Greenwood", safety: 8, affordability: 6, nightlife: 4, schools: 9, parks: 7 },
        { name: "Downtown", safety: 7, affordability: 5, nightlife: 9, schools: 6, parks: 4 },
        { name: "Riverside", safety: 6, affordability: 7, nightlife: 5, schools: 8, parks: 8 }
    ])
    .then(() => {
        console.log("Data inserted");
        mongoose.disconnect();
    })
    .catch(err => console.log(err));
})
.catch(err => console.log(err));
