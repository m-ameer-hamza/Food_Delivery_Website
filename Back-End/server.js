import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
//setting up the config file
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3000;

//connecting to the database
mongoose
  .connect(process.env.DATA_BASE_STRING)
  .then(() => {
    console.log("Database connected successfully.....");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
    process.exit(1); // Exit the process if the database connection fails
  });

//starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.....`);
});
