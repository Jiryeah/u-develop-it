const express = require(`express`);
const mysql = require(`mysql2`);

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: `localhost`,
    // Your MySQL username,
    user: `root`,
    // Your MySQl password
    password: `Fs_goma5`,
    database: `election`
  },
  console.log(`Connected to the election database.`)
);

//* db object is using the query method to run the SQL query and executes
//* the callback with all the resulting rows that match the query
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

// GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(row);
// });

// Query for Delete Operation
//* '?' denotes a placeholder. This is now a 'prepared statement' which
//* can execute the same SQL statements repeatedly using different
//*  values in place of the placeholder.
//* Another reason to use a placeholder in SQL query is to block
//* a SQL injection attack, which replaces the clients user var
//* & inserts alternate commands that could reveal or destroy the db
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Create a candidate
//* four placeholders were used for the corresponding columns holding the values.
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
              // VALUES (?,?,?,?)`;
//* four placeholders must match the four values in params, so we must use an array.
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
