import "dotenv/config";

import app from "./src/app.js";
import connectDB from "./src/db/database.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server crushed due to mongo error : ${err}`);
  });

