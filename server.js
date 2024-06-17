    const express = require('express');
    const axios = require('axios');
    const app = express();
    var cors = require('cors')
    const bodyParser = require('body-parser');
    const dbConnect = require('./config/dbconnect');
    const multer = require('multer');
    app.use(bodyParser.urlencoded({ extended: true }));
    const route  = require('./router');
    app.use(bodyParser.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    const upload = multer();
    route(app);
    dbConnect();
    const port = process.env.PORT || 3005;
    app.listen(port,() => {
        console.log(`Máy chủ đang chạy trên cổng ${port} `);
    });
