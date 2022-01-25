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

// db object is using the query method to run the SQL query and executes
// the callback with all the resulting rows that match the query
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

// GET a single candidate
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
