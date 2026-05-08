const Expert = require("../models/Expert");

exports.getExperts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;

    const search = req.query.search || "";
    const category = req.query.category || "";

    const query = {
      name: { $regex: search, $options: "i" }
    };

    if (category) {
      query.category = category;
    }

    const experts = await Expert.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Expert.countDocuments(query);

    res.json({
      experts,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);

    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    res.json(expert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createExpert = async (req, res) => {
  try {
    const expert = await Expert.create(req.body);

    res.status(201).json(expert);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};