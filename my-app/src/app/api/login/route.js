export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the api page")
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const pass = searchParams.get('pass')
    console.log(email);
    console.log(pass);

    // database call goes here
    // =================================================
    const { MongoClient } = require('mongodb');

    const url = 'mongodb://root:example@localhost:27017/';
    const client = new MongoClient(url);

    const dbName = 'app'; // database name

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('login'); // collection name

    const findResult = await collection.find({"username":
    "sample@test.com"}).toArray();
    console.log('Found documents =>', findResult);

    
    let valid = false

    const bcrypt = require('bcrypt');
    let hashResult = bcrypt.compareSync(pass, findResult[0].pass); //true

    console.log("checking " + findResult[0].pass);
    console.log("Hash Comparison Result: " + hashResult); 

    if(findResult.length >0 ){
    valid = true;
    console.log("login valid")
    } else {
    valid = false;
    console.log("login invalid")
    }
//==========================================================

    // at the end of the process we need to send something back.
    return Response.json({ "data":"valid" })
    }