// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const userRoute = require("./routes/user");
// const authRoute = require("./routes/auth")
// dotenv.config();

// mongoose
//     .connect(process.env.MONGO_URL)
//     .then(() => console.log("DB Connection Sucessful"))
//     .catch((err) => {
//         console.log(err);
//     });
// app.use(express.json());
// app.use("/api/users", userRoute);
// app.use("/api/auth", authRoute);

// app.listen(process.env.PORT, () => {
//     console.log(`port listening at ${process.env.PORT} `);
// });



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productsRoute = require("./routes/product");
// const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
// const orderRoute = require("./routes/order");
// const stripeRoute = require("./routes/stripe");
// const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

// app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productsRoute);
// app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
// app.use("/api/orders", orderRoute);
// app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
