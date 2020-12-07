// EXPRESS AND OTHER SETUP
const express = require('express');
const MongoUtil = require('./MongoUtil.js')


// load in environment variables
require('dotenv').config();

// create the app
const app = express();

async function main() {
    const MONGO_URL=process.env.MONGO_URL;
    await MongoUtil.connect(MONGO_URL, "sample_airbnb");
    let db = MongoUtil.getDB();
    // let results = await db.collection('listingsAndReviews').find().limit(10).toArray();
    // console.log(results);

    // ROUTES
    app.get('/', async (req, res)=>{
        let results = await db.collection('listingsAndReviews').find({},{
            'name': 1, 'address': 1
        }).limit(10).toArray();
        res.send(results)
    })
}




main();
// LISTEN
app.listen(3000, ()=>{
    console.log("Express is running")
    
})
