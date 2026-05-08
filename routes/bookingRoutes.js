const express = require("express");
const {
  createBooking,
  updateBookingStatus,
  getBookingsByEmail
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking);
router.patch("/:id/status", updateBookingStatus);
router.get("/", getBookingsByEmail);

module.exports = router;