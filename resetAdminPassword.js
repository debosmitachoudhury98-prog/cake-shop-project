
require("dotenv").config();

const mongoose = require("mongoose");
const readline = require("readline");
const User = require("./models/userModel");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.mongodb+srv://debosmitachoudhury98_db_user:JHRG3aMVbLkQMZhC@cluster0.2elheeb.mongodb.net/cake-shop
      );

    rl.question("Enter new admin password: ", async (password) => {
      try {
        const user = await User.findOne({
          email: "debosmitasitm98@gmail.com",
        });

        if (!user) {
          console.log("Admin user not found!");
        } else {
          user.password = password;
          await user.save();

          console.log("Admin password updated successfully!");
        }
      } catch (error) {
        console.log("Error:", error.message);
      } finally {
        await mongoose.disconnect();
        rl.close();
      }
    });
  } catch (error) {
    console.log("Database error:", error.message);
    rl.close();
  }
};

resetPassword();
