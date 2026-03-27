const Sales = require("../sales/sales.model");

const getDashboard = async ({ search, unitCode, page = 1, limit = 10 }) => {
  const query = {};
  if (unitCode) query.unitCode = { $regex: unitCode, $options: "i" };

  const skip = (page - 1) * limit;
  const [entries, total] = await Promise.all([
    Sales.find(query)
      .populate("submittedBy", "fullName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Sales.countDocuments(query),
  ]);

  const filtered = search
    ? entries.filter((e) =>
        e.submittedBy?.fullName?.toLowerCase().includes(search.toLowerCase())
      )
    : entries;

  return { entries: filtered, total, page: Number(page), limit: Number(limit) };
};

const getEntryDetails = async (id) => {
  const entry = await Sales.findById(id).populate("submittedBy", "fullName email role");
  if (!entry) {
    const err = new Error("Entry not found");
    err.statusCode = 404;
    throw err;
  }
  return entry;
};

module.exports = { getDashboard, getEntryDetails };
