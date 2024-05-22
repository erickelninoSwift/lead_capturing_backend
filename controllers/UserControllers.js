const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/UserModel");

const saltRounds = 10;
const myhashmyPassword = (myPlaintextPassword) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(myPlaintextPassword, salt);
};

const LoginController = async (request, response) => {
  const { email, password } = request.body;
  try {
    if (!email || !password) {
      return response.json({
        detail: "Please provide email / password",
      });
    }
    // chaking user

    const userFound = await User.find({ email: email });
    if (!userFound) {
      return response.json({
        detail: "User not found ,Provide correct details",
      });
    }

    const comparePassword = await bcrypt.compare(
      password,
      userFound[0].password
    );

    if (!comparePassword) {
      return response.json({
        detail: "password used was not correct",
      });
    }
    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
    return response.status(200).json({
      email: userFound[0].email,
      token,
      message: "Login Success",
    });
  } catch (error) {
    response.json({
      detail: "failed to connect tto server",
    });
  }
};

const SignupController = async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.json({
      detail: "Please dont leave field empty",
    });
  }
  const hashed = myhashmyPassword(password);

  try {
    const createdUser = new User({
      email,
      password: hashed,
    });
    await createdUser
      .save()
      .then(() => {
        const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
        return response.json({ email, token });
      })
      .catch((error) => {
        console.log(error);
        return response.json({
          detail: "Failed to save user",
        });
      });
  } catch (error) {
    return response.json({
      detail: error,
    });
  }
};

module.exports = { LoginController, SignupController };

// const SignupController = async (request, response) => {
//   const { email, password } = request.body;

//   const hashed = myhashmyPassword(password);

//   try {
//     await pool.query(
//       "INSERT INTO users (email, hashed_password) VALUES ($1, $2)",
//       [email, hashed]
//     );

//     const token = jwt.sign({ email }, "secret", { expiresIn: "3h" });
//     return response.json({ email, token });
//   } catch (error) {
//     return response.json({
//       detail: error,
//     });
//   }
// };

// const LoginController = async (request, response) => {
//   const { email, password } = request.body;
//   try {
//     // chaking user
//     const userFound = await pool.query("SELECT * FROM users WHERE email = $1", [
//       email,
//     ]);
//     if (!userFound.rows.length) {
//       return response.json({
//         detail: "please provide correct username/password",
//       });
//     }
//     const comparePassword = await bcrypt.compare(
//       password,
//       userFound.rows[0].hashed_password
//     );

//     if (!comparePassword) {
//       return response.json({
//         detail: "password used was not correct",
//       });
//     }
//     const token = jwt.sign({ email }, "secret", { expiresIn: "3h" });
//     return response.status(200).json({
//       email: userFound.rows[0].email,
//       token,
//       message: "Login Success",
//     });
//   } catch (error) {
//     response.json({
//       detail: "failed to connec tto server",
//     });
//   }
// };
