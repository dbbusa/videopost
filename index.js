const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const route = require("./route");
const { json } = require('body-parser');
mongoose.connect("mongodb+srv://user1:apstndp16@cluster0.vqjzb.mongodb.net/students?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {
        const app = express();
        app.use("/api", route);
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.json());
        // Add headers
        app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server Started on 3000 !!");
        });
    }
);