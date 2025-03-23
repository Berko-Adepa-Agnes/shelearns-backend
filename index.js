import { connectDB } from "./src/config/database.js";
import app from "./src/app.js";

const start = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log("\x1b[32m%s\x1b[0m", "App is 🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️ on port " + PORT);
    });
  } catch (err) {
    console.error(err.message);
  }
};

console.clear();

start();
