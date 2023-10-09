const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const jsonParser = bodyParser.json()
const mongodb = new MongoClient
  ('mongodb+srv://tcjcart:KIGVdwITo2wezidk@cartweb.yofpduu.mongodb.net/Products?retryWrites=true&w=majority');

app.get("/getProductlist", async (req, res) => {
    const productslist = await mongodb.db().collection('Products').find({}).toArray();
    res.json(productslist);
})

app.get("/getPurchaseHistory", async (req, res) => {
  const productslist = await mongodb.db().collection('PurchaseHistory').find({}).toArray();
  res.json(productslist);
})

app.post("/updatePurchaseHistory", jsonParser, async (req, res) => {
  const response = await mongodb.db().collection('PurchaseHistory').insertOne(req.body);

  res.status(200).json(req.body);
  //res.json(response.insertedId);
})

app.post("/updateProductList", jsonParser, async (req, res) => {
  const response = await mongodb.db().collection('Products').replaceOne(
    { _id: new ObjectId(req.body._id) },
    {
      name: req.body.name,
      cost: req.body.cost,
      img: req.body.img,
      remaining: req.body.remaining,
    }, {upsert: true});

  res.status(200).json(req.body);
})

app.listen(5000, () => {console.log("Server started on port 5000")})