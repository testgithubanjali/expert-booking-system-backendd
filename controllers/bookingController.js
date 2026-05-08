const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const { expertId, name, email, phone, date, timeSlot, notes } = req.body;

    if (!name || !email || !phone || !date || !timeSlot) {
      return res.status(400).json({
        message: "All required fields are mandatory"
      });
    }

    const booking = await Booking.create({
      expertId,
      name,
      email,
      phone,
      date,
      timeSlot,
      notes
    });

    req.io.emit("slotBooked", {
      expertId,
      date,
      timeSlot
    });

    res.status(201).json({
      message: "Booking Successful",
      booking
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Slot already booked"
      });
    }

    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      {
        new: true
      }
    );

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

