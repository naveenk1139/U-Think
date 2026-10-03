
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/u-think").then(async () => {
  const db = mongoose.connection.db;
  const activeCourses = await db.collection("courses").find({ active: true }).toArray();
  const inactiveCourses = await db.collection("courses").find({ active: { $ne: true } }).toArray();
  console.log("Active courses:", activeCourses.length);
  console.log("Inactive/Missing active field courses:", inactiveCourses.length);
  console.log("Active streams:", activeCourses.map(c => c.stream));
  process.exit(0);
});

