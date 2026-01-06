// Run with: node seed.js (after installing dependencies and setting MONGO_URI in .env)
const mongoose = require('mongoose');
const Category = require('./models/Category');
require('dotenv').config();

const data = [
  "Roasted Snacks",
  "Baked Snacks",
  "Trail Mixes",
  "Protein Bars",
  "Energy Bars",
  "Granola Bars",
  "Almonds",
  "Cashews",
  "Walnuts",
  "Pistachios",
  "Chia Seeds",
  "Quinoa",
  "Cold Pressed Juices",
  "Honey",
  "Oats & Muesli",
  "Herbal Teas",
  "Festival Gift Boxes"
];

async function main(){
  const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/havbit_admin';
  await mongoose.connect(MONGO);
  console.log('Connected');
  for(const name of data){
    await Category.create({ name });
    console.log('Inserted', name);
  }
  console.log('Done');
  process.exit();
}

main().catch(e=>{ console.error(e); process.exit(1); });
