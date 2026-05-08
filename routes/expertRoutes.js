const express = require("express");
const {
  getExperts,
  getExpertById,
   createExpert
} = require("../controllers/expertController");

const router = express.Router();

router.get("/", getExperts);
router.get("/:id", getExpertById);
router.post("/", createExpert);

module.exports = router;