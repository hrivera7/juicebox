// inside db/index.js
const { Client } = require("pg"); // imports the pg module

// supply the db name and location of the database
// have to pass username and password to localhost
const client = new Client(
  "postgres://hrive:password@localhost:5432/juicebox-dev"
);

async function createUser({ username, password }) {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO users(username, password)
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `,
      [username, password]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username 
    FROM users;
  `
  );
  console.log("rows", rows);
  return rows;
}

//export them
module.exports = {
  createUser,
  client,
  getAllUsers,
};
