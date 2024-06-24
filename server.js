const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const dbConnect = require("./config/dbconnect");

const route = require("./router");

const app = express();
const port = process.env.PORT || 3005;

// Cấu hình CORS
app.use(cors({
  origin: ["http://localhost:3001", "http://127.0.0.1:3001"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type,authorization",
}));

// Cấu hình body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Sử dụng multer để xử lý upload
// Ví dụ: xử lý mọi request chứa dữ liệu multipart/form-data
// Nếu chỉ muốn xử lý một field cụ thể, sử dụng upload.single('fieldName')
// app.use(upload.any());

// Kết nối đến cơ sở dữ liệu
dbConnect();

// Sử dụng router
route(app);

// Khởi động máy chủ
app.listen(port, () => {
  console.log(`Máy chủ đang chạy trên cổng ${port}`);
});
