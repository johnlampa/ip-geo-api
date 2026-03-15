const db = require("../database/db");

const seedUser = () => {
  const email = "email@gmail.com";
  const password = "password123";

  db.run(
    `INSERT OR IGNORE INTO users (email, password) VALUES (?, ?)`,
    [email, password],
    (err) => {
      if (err) {
        console.error("Seeder error:", err);
      } else {
        console.log("User seeded successfully");
      }
    },
  );
};

seedUser();
