"use strict";

const mongoose = require("mongoose");

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

const connectString = `mongodb+srv://tuong:tuongioe123@cluster0.jcqvha9.mongodb.net/db_mern_e_commerce?retryWrites=true&w=majority&appName=Cluster0`;

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose.set("debug", true);
    mongoose.set("debug", { color: true });

    mongoose
      .connect(connectString)
      .then((_) => console.log(`Connected Mongodb Success `))
      .catch((err) => console.log(`Error Connect! `, err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
