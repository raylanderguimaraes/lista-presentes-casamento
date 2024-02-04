const mongoose = require("mongoose");
require("dotenv").config();

// Conectar o banco de dados
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const conectDb = async () => {
  try {
    const URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.1aq4d2r.mongodb.net/?retryWrites=true&w=majority`;
    const db = await mongoose.connect(URI);
    console.log("Conecatado ao MongoDB");
    return db;
  } catch (error) {
    console.error({ error: "Erro ao conectar ao banco!" });
    throw error;
  }
};
conectDb();
module.exports = conectDb;
