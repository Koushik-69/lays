const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
engine = require('ejs-mate');
app.engine('ejs', engine);

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const Product = require("./models/product.js");
const port = process.env.PORT || 3000;

// MongoDB connection
main().then((res) => {
  console.log("Connected to DB");
})
.catch((err) => {
  console.log(err);
});

async function main() {
  const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crunchyHub';
  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

// Start server
app.listen(port, () => {
  console.log("App running on port", port);
});

// Route Handlers
app.get('/', (req, res) => {
  res.render("layouts/front.ejs");
});

app.post('/home', async (req, res) => {
  const data = req.body;
  data.txt = data.txt.toUpperCase();
  const products = await Product.find({});
  console.log(products);
  res.render("layouts/home.ejs", { data, products });
});

app.get('/home', async (req, res) => {
  const products = await Product.find({});
  res.render("layouts/home.ejs", { products });
});

app.get('/cart', async (req, res) => {
  const products = await Product.find({});
  res.render("layouts/cart.ejs", { products });
});

app.get('/show/:id', async (req, res) => {
  const { id } = req.params;
  const products = await Product.findById(id);
  res.render("layouts/show.ejs", { products });
});

app.get('/about_us', (req, res) => { // Corrected route for about_us
  res.render("layouts/about_us.ejs");
});
