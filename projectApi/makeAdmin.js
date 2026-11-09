
require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/userModel");

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    const user = await User.findOneAndUpdate(
      { email: "debosmitasitm98@gmail.com" },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      console.log("User not found!");
    } else {
      console.log("User is now an admin:", user.email);
    }
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

makeAdmin();
