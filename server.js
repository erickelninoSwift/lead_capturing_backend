const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./connect/connect");
const { pool } = require("./connect/db");
// Routes ireuired
const LoginuserRoute = require("./routes/LoginRoute");
const SignuserRoute = require("./routes/SignupRoute");
const LeadRoute = require("./routes/LeadsRoute");
// const CreateLead = require("./routes/LeadsRoute");
// ====================================

dotenv.config();

const PORT = process.env.PORT ?? 8080;
const app = express();

//middlewares cors and json
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// =============

// =============================
// register User
// ===================================
app.use(SignuserRoute);
// =============================
// Login middleware
app.use(LoginuserRoute);
// ==========
// All leads or Lead operations
// ==================
app.use(LeadRoute);
// ===============

// Filter leads By Given Date range
// ==============================

// app.get("/users", async (request, response) => {
//   try {
//     const allusers = await pool.query("SELECT * FROM users");
//     console.log(allusers.rows);
//     return response.json({
//       users: allusers.rows,
//     });
//   } catch (error) {
//     console.log(error);
//     response.json({
//       detail: error,
//     });
//   }
// });

// connect to DB and server
const start_server = async () => {
  try {
    await connectDB(process.env.MONGODB_STRING).then(() => {
      app.listen(PORT, () => {
        console.log("Application is runnig on PORT: ", PORT);
      });
    });
  } catch (error) {
    console.log(`Error was found : ${error}`);
  }
};

// ==================

start_server();
