const express = require("express");
const cors = require("cors");
const db = require("./database/db");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required",
    });
  }
  // Parameterized query prevents SQL injection
  const query = `
    SELECT * FROM users
    WHERE email = ? AND password = ?
  `;

  db.get(query, [email, password], (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    // Omit password from the response payload
    return res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  });
});

app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});
