const express = require('express');

const app = express();
const port = 41005;

app.post("/postentry", function (request, response) {
    console.log('Incoming entry');
    let bodyData = request.body;

    console.log('bodyData');
})