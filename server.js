const express = require(`express`);
const mysql = require(`mysql2`);

const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require(`./utils/inputCheck`)

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
//* also, the asterisk means 'all columns'.
// Get all candidates
app.get(`/api/candidates`, (req, res) => {
  const sql = `SELECT * FROM candidates`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      //* 500 is a server error
      res.status(500).json({ error: err.message });
    }
    res.json({
      message: `success`,
      data: rows
    });
  });
});

// GET a single candidate
app.get(`/api/candidate/:id`, (req,res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      //* 400 notifies the client that their request wasn't accepted & to try a different request.
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: `success`,
      data: row
    });
  });
});

// Query for Delete Operation
//* '?' denotes a placeholder. This is now a 'prepared statement' which
//* can execute the same SQL statements repeatedly using different
//*  values in place of the placeholder.
//* Another reason to use a placeholder in SQL query is to block
//* a SQL injection attack, which replaces the clients user var
//* & inserts alternate commands that could reveal or destroy the db.
app.delete(`/api/candidate/:id`, (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: `Candidate not found`
      });
    } else {
      res.json({
        message: `deleted`,
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Create a candidate
//* post method used to insert candidate in candidates table.
//* req.body object used to populate candidates data.
//* object destructuring used to pull body property out of the request object.
app.post(`/api/candidate`, ({ body }, res) => {
  const errors = inputCheck(body, `first_name`, `last_name`, `industry_connected`)
  if (errors) {
    res.status(400).json({ error: errors});
    return;
  }

  //* four placeholders were used for the corresponding columns holding the values.
  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
  //* four placeholders must match the four values in params, so we must use an array.
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});


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
