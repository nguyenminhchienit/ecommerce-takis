const express = require("express");
const insertDataController = require("../controllers/insertDataController");

const router = express.Router();

router.post("/", insertDataController.insertDataProduct);
router.post("/cate", insertDataController.insertDataCate);

module.exports = router;
