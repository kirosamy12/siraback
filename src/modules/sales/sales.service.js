const Sales = require("./sales.model");
const { broadcast } = require("../../utils/sse");

const createEntry = async ({ unitCode, ownerPhone }, userId) => {
  const entry = await Sales.create({ unitCode, ownerPhone, submittedBy: userId });
  const populated = await entry.populate("submittedBy", "fullName");
  // notify operations dashboard in real-time
  broadcast("new_unit", {
    _id: populated._id,
    unitCode: populated.unitCode,
    ownerPhone: populated.ownerPhone,
    submittedBy: populated.submittedBy,
    createdAt: populated.createdAt,
  });
  return populated;
};

const getEntries = async ({ search, unitCode, page = 1, limit = 10 }) => {
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

  // filter by submittedBy name after populate if search provided
  const filtered = search
    ? entries.filter((e) =>
        e.submittedBy?.fullName?.toLowerCase().includes(search.toLowerCase())
      )
    : entries;

  return { entries: filtered, total, page: Number(page), limit: Number(limit) };
};

const getEntryById = async (id) => {
  const entry = await Sales.findById(id).populate("submittedBy", "fullName email");
  if (!entry) {
    const err = new Error("Entry not found");
    err.statusCode = 404;
    throw err;
  }
  return entry;
};

const getMyEntries = async (userId, { unitCode, page = 1, limit = 10 }) => {
  const query = { submittedBy: userId };
  if (unitCode) query.unitCode = { $regex: unitCode, $options: "i" };

  const skip = (page - 1) * limit;
  const [entries, total] = await Promise.all([
    Sales.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Sales.countDocuments(query),
  ]);

  return { entries, total, page: Number(page), limit: Number(limit) };
};

module.exports = { createEntry, getEntries, getEntryById, getMyEntries };
